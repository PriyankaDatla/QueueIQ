package com.queueintelligence.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeatmapResponse {

    private Long queueId;

    private String queueName;

    private Double latitude;

    private Double longitude;

    private Integer waitingTokens;

    private Integer estimatedWait;

    private String congestion;

    private Double rating;
}