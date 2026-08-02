package com.queueintelligence.controller;

import com.queueintelligence.dto.*;
import com.queueintelligence.entity.Queue;
import com.queueintelligence.entity.Token;
import com.queueintelligence.service.QueueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/queues")
public class QueueController {

    private final QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    // ===========================
    // ADMIN APIs
    // ===========================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<String> createQueue(@RequestBody QueueRequest request) {
        return ResponseEntity.ok(queueService.createQueue(request));
    }

    @GetMapping
    public List<Queue> getQueues() {
        return queueService.getAllQueues();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/serve-next/{queueId}")
    public String serveNext(@PathVariable Long queueId) {
        return queueService.serveNextToken(queueId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/counter/open")
    public String openCounter(@RequestBody CounterRequest request) {
        return queueService.openCounter(request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/counter/close/{counterId}")
    public String closeCounter(@PathVariable Long counterId) {
        return queueService.closeCounter(counterId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/analytics")
    public AnalyticsResponse getAnalytics() {
        return queueService.getAnalytics();
    }

    // ===========================
    // CUSTOMER APIs
    // ===========================

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/join")
    public String joinQueue(@RequestBody JoinQueueRequest request) {
        System.out.println("JOIN API HIT");
        return queueService.joinQueue(request);
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/status/{tokenId}")
    public QueueStatusResponse getQueueStatus(@PathVariable Long tokenId) {
        return queueService.getQueueStatus(tokenId);
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/cancel/{tokenId}")
    public ResponseEntity<String> cancelToken(@PathVariable Long tokenId) {
        System.out.println("Cancel API Hit");
        return ResponseEntity.ok(queueService.cancelToken(tokenId));
    }

    // ===========================
    // COMMON APIs
    // ===========================

    @GetMapping("/tokens/{userId}")
    public List<Token> getUserTokens(@PathVariable Long userId) {
        return queueService.getUserTokens(userId);
    }

    @GetMapping("/analytics/trend")
    public List<TrendResponse> getTrend() {
        return queueService.getQueueTrend();
    }

    @GetMapping("/analytics/distribution")
    public List<DistributionResponse> getDistribution() {
        return queueService.getQueueDistribution();
    }

    @GetMapping("/analytics/top-queues")
    public List<TopQueueResponse> getTopQueues() {
        return queueService.getTopQueues();
    }

    @GetMapping("/analytics/recent")
    public List<RecentActivityResponse> getRecentActivities() {
        return queueService.getRecentActivities();
    }
    @GetMapping("/heatmap")
    public List<HeatmapResponse> getHeatmap() {
        return queueService.getHeatmapData();
    }
    @GetMapping("/customer-analytics")
    public CustomerAnalyticsResponse getCustomerAnalytics(Authentication authentication) {

        return queueService.getCustomerAnalytics(authentication.getName());

    }
}