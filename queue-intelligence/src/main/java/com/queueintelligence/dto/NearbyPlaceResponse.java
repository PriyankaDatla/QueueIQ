package com.queueintelligence.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NearbyPlaceResponse {

    private String placeId;
    private String name;
    private String address;

    private double latitude;
    private double longitude;

    private double distance;

    private boolean registered;

    private long queueId;

    private int currentQueueSize;

    private int estimatedWaitTime;

    private double rating;

    private double recommendationScore;
}