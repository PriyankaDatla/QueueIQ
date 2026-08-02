package com.queueintelligence.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationResponse {

    private Long queueId;
    private String queueName;
    private String serviceType;
    private String address;
    private Double distance;
    private Double rating;

    private Integer availableSlots;
    private Boolean registered;
    private Integer averageServiceTime;
    private LocalDateTime expectedServiceTime;
    private Long currentQueueSize;
    private Integer estimatedWait;
    private Double latitude;
    private Double longitude;
    private Double recommendationScore;
    private String recommendation;
    private String queueHealth;
    private List<String> reasons;

    public Boolean getSlotAvailable() {
        return availableSlots != null && availableSlots > 5;
    }
}