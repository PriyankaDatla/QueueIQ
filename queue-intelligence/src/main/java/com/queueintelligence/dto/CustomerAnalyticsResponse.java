package com.queueintelligence.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerAnalyticsResponse {

    private Long queuesJoined;

    private Long completedVisits;

    private Double averageWait;

    private Long cancelledQueues;

    private Long totalTimeSaved;

    private Double efficiencyScore;

    private List<DailyActivityResponse> activity;

}