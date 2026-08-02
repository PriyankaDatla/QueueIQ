package com.queueintelligence.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivityResponse {

    private String activity;
    private String type;
    private String time;

}