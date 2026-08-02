package com.queueintelligence.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class JoinQueueRequest {

    private Long userId;

    private Long queueId;

    private LocalDateTime scheduledTime;
}