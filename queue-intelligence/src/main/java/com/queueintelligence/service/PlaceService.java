package com.queueintelligence.service;

import com.queueintelligence.dto.NearbyPlaceResponse;
import com.queueintelligence.dto.GeoapifyResponse;
import com.queueintelligence.repository.QueueRepository;
import com.queueintelligence.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.queueintelligence.repository.QueueRepository;
import com.queueintelligence.entity.Queue;
import com.queueintelligence.entity.enums.QueueStatus;
import com.queueintelligence.entity.enums.ServiceType;
import com.queueintelligence.util.DistanceUtil;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor

public class PlaceService {

    private final WebClient webClient;

    @Value("${geoapify.api.key}")
    private String apiKey;

    private final TokenRepository tokenRepository;

    private final QueueRepository queueRepository;

    private double calculateRecommendationScore(
            NearbyPlaceResponse dto) {

        double distanceScore =
                Math.max(0, 100 - dto.getDistance() * 10);

        double waitScore =
                Math.max(0, 100 - dto.getEstimatedWaitTime());

        double queueScore =
                Math.max(0, 100 - dto.getCurrentQueueSize() * 5);

        double ratingScore =
                dto.getRating() * 20;

        return

                distanceScore * 0.35 +
                        waitScore * 0.35 +
                        queueScore * 0.20 +
                        ratingScore * 0.10;
    }

    public List<NearbyPlaceResponse> getNearbyPlaces(
            double latitude,
            double longitude,
            String serviceType) {

        String category = mapCategory(serviceType);

        GeoapifyResponse response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("api.geoapify.com")
                        .path("/v2/places")
                        .queryParam("categories", category)
                        .queryParam("filter",
                                "circle:" + longitude + "," + latitude + ",5000")
                        .queryParam("limit", 20)
                        .queryParam("apiKey", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(GeoapifyResponse.class)
                .block();

        List<Queue> registeredQueues =
                queueRepository.findByServiceTypeAndActiveTrueAndStatus(
                        ServiceType.valueOf(serviceType.toUpperCase()),
                        QueueStatus.OPEN
                );

        List<NearbyPlaceResponse> places = new ArrayList<>();

        if (response == null || response.getFeatures() == null)
            return places;

        for (GeoapifyResponse.Feature feature : response.getFeatures()) {

            GeoapifyResponse.Properties p = feature.getProperties();

            NearbyPlaceResponse dto = NearbyPlaceResponse.builder()
                    .placeId(p.getPlace_id())
                    .name(p.getName() != null ? p.getName() : p.getFormatted())
                    .address(p.getFormatted())
                    .latitude(p.getLat())
                    .longitude(p.getLon())
                    .registered(false)
                    .build();

            dto.setDistance(
                    DistanceUtil.calculateDistance(
                            latitude,
                            longitude,
                            dto.getLatitude(),
                            dto.getLongitude()
                    )
            );

            for (Queue queue : registeredQueues) {

                double queueDistance =
                        DistanceUtil.calculateDistance(
                                queue.getLatitude(),
                                queue.getLongitude(),
                                dto.getLatitude(),
                                dto.getLongitude()
                        );

                if (queueDistance <= 0.3) {

                    dto.setRegistered(true);

                    Long queueSize =
                            tokenRepository.getCurrentQueueSize(queue.getQueueId());

                    if (queueSize == null)
                        queueSize = 0L;

                    dto.setQueueId(queue.getQueueId());
                    dto.setCurrentQueueSize(queueSize.intValue());

                    dto.setEstimatedWaitTime(
                            queue.getAverageServiceTime() * queueSize.intValue()
                    );

                    dto.setRating(queue.getRating());

                    dto.setRecommendationScore(
                            calculateRecommendationScore(dto)
                    );

                    dto.setLatitude(queue.getLatitude());
                    dto.setLongitude(queue.getLongitude());

                    break;
                }
            }

            places.add(dto);
        }

        places.sort(
                Comparator.comparing(
                        NearbyPlaceResponse::getRecommendationScore
                ).reversed()
        );

        return places;
    }

    private String mapCategory(String serviceType) {

        return switch (serviceType.toUpperCase()) {

            case "HOSPITAL" -> "healthcare.hospital";

            case "BANK" -> "commercial.bank";

            case "PHARMACY" -> "healthcare.pharmacy";

            case "RESTAURANT" -> "catering.restaurant";

            case "POST_OFFICE" -> "service.post_office";

            case "DIAGNOSTIC_CENTER" -> "healthcare.clinic";

            case "RTO" -> "office.government";

            case "GOVERNMENT_OFFICE" -> "office.government";

            default -> "healthcare.hospital";
        };
    }



}