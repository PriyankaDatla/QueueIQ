package com.queueintelligence.service;

import com.queueintelligence.dto.RecommendationResponse;
import com.queueintelligence.entity.Queue;
import com.queueintelligence.entity.enums.QueueStatus;
import com.queueintelligence.entity.enums.ServiceType;
import com.queueintelligence.repository.QueueRepository;
import com.queueintelligence.repository.TokenRepository;
import com.queueintelligence.util.DistanceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final QueueRepository queueRepository;
    private final TokenRepository tokenRepository;

    public List<RecommendationResponse> recommend(
            ServiceType serviceType,
            Double userLatitude,
            Double userLongitude){

        List<Queue> queues = queueRepository
                .findByServiceTypeAndActiveTrueAndStatus(
                        serviceType,
                        QueueStatus.OPEN
                );

        return queues.stream()
                .map(queue -> convert(queue, userLatitude, userLongitude))
                .sorted(
                        Comparator.comparing(
                                RecommendationResponse::getRecommendationScore
                        ).reversed()
                )
                .toList();
    }

    private RecommendationResponse convert(
            Queue queue,
            Double userLatitude,
            Double userLongitude) {
        
        Long currentQueueSize = tokenRepository.getCurrentQueueSize(queue.getQueueId());


        if (currentQueueSize == null) {
            currentQueueSize = 0L;
        }

        int availableSlots =
                queue.getMaxCapacity() - currentQueueSize.intValue();

        int estimatedWait = (int) (currentQueueSize * queue.getAverageServiceTime());

        LocalDateTime expectedServiceTime =
                LocalDateTime.now().plusMinutes(estimatedWait);

        double distance = DistanceUtil.calculateDistance(
                userLatitude,
                userLongitude,
                queue.getLatitude(),
                queue.getLongitude()
        );

        double score =
                (10 - Math.min(distance, 10)) * 6.0 +      // 60 points
                        (60 - Math.min(estimatedWait, 60)) * 0.4 + // 24 points
                        (queue.getRating() * 3.0) +                // 15 points
                        (50 - Math.min(currentQueueSize, 50)) * 0.02; // 1 point

        String recommendation;

        if (score >= 85) {
            recommendation = "🟢 Highly Recommended";
        } else if (score >= 70) {
            recommendation = "🟡 Recommended";
        } else if (score >= 50) {
            recommendation = "🟠 Moderate";
        } else {
            recommendation = "🔴 Consider Other Options";
        }



        String queueHealth;

        if (currentQueueSize < 5) {
            queueHealth = "LOW";
        } else if (currentQueueSize < 15) {
            queueHealth = "MEDIUM";
        } else {
            queueHealth = "HIGH";
        }

        return RecommendationResponse.builder()
                .queueId(queue.getQueueId())
                .queueName(queue.getQueueName())
                .serviceType(queue.getServiceType().name())
                .address(queue.getAddress())

                // ADD THESE TWO LINES
                .latitude(queue.getLatitude())
                .longitude(queue.getLongitude())

                .distance(distance)
                .rating(queue.getRating())
                .currentQueueSize(currentQueueSize)
                .availableSlots(availableSlots)
                .averageServiceTime(queue.getAverageServiceTime())
                .estimatedWait(estimatedWait)
                .expectedServiceTime(expectedServiceTime)
                .recommendationScore(score)
                .recommendation(recommendation)
                .queueHealth(queueHealth)
                .build();
    }
}