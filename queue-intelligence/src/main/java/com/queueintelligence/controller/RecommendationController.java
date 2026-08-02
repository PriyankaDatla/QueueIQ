package com.queueintelligence.controller;

import com.queueintelligence.dto.RecommendationResponse;
import com.queueintelligence.entity.enums.ServiceType;
import com.queueintelligence.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/{serviceType}")
    public List<RecommendationResponse> recommend(
            @PathVariable ServiceType serviceType,
            @RequestParam Double latitude,
            @RequestParam Double longitude) {

        return recommendationService.recommend(serviceType, latitude, longitude);
    }
}