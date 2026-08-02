package com.queueintelligence.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopQueueResponse {

    private String queueName;
    private Long customers;
    private Double averageWait;
    private Double rating;

}