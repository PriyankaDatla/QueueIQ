package com.queueintelligence.controller;

import com.queueintelligence.dto.NearbyPlaceResponse;
import com.queueintelligence.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/places")
@RequiredArgsConstructor
@CrossOrigin
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping("/nearby")
    public List<NearbyPlaceResponse> nearby(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam String amenity
    ) {

        return placeService.getNearbyPlaces(
                latitude,
                longitude,
                amenity
        );
    }
}