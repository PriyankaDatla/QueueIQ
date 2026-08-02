package com.queueintelligence.dto;

import lombok.*;
import com.queueintelligence.entity.enums.ServiceType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QueueRequest {

    private String queueName;

    private ServiceType serviceType;

    private String address;

    private Double latitude;

    private Double longitude;

    private Integer maxCapacity;

    private Integer averageServiceTime;

    private Double rating;

    private String phoneNumber;
}