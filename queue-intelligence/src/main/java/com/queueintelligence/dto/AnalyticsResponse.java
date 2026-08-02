package com.queueintelligence.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {

    private long activeQueues;

    private long waitingTokens;

    private long servingTokens;

    private long completedTokens;

    private double averageWaitTime;

    private long totalCustomersServed;

    private String busiestHour;
}