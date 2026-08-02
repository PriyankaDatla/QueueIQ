package com.queueintelligence.dto;

import lombok.Data;
import java.util.List;

@Data
public class GeoapifyResponse {

    private List<Feature> features;

    @Data
    public static class Feature {

        private Properties properties;
    }

    @Data
    public static class Properties {

        private String place_id;
        private String name;
        private String formatted;
        private double lat;
        private double lon;
    }
}