package com.queueintelligence.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyActivityResponse {

    private String day;

    private Long queues;

}