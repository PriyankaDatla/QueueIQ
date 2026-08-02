package com.queueintelligence.service;

import com.queueintelligence.dto.*;
import com.queueintelligence.entity.Counter;
import com.queueintelligence.entity.Queue;
import com.queueintelligence.entity.Token;
import com.queueintelligence.entity.enums.QueueStatus;
import com.queueintelligence.entity.enums.TokenStatus;
import com.queueintelligence.exception.ResourceNotFoundException;
import com.queueintelligence.repository.CounterRepository;
import com.queueintelligence.repository.QueueRepository;
import com.queueintelligence.repository.UserRepository;
import com.queueintelligence.repository.TokenRepository;
import com.queueintelligence.repository.QueueAnalyticsRepository;
import com.queueintelligence.entity.User;
import com.queueintelligence.entity.QueueAnalytics;
import java.time.Duration;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QueueService {

    private final QueueRepository queueRepository;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final CounterRepository counterRepository;
    private final QueueAnalyticsRepository queueAnalyticsRepository;

    public QueueService(
            QueueRepository queueRepository,
            TokenRepository tokenRepository,
            UserRepository userRepository,
            CounterRepository counterRepository,
            QueueAnalyticsRepository queueAnalyticsRepository){

        this.queueRepository = queueRepository;
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.counterRepository = counterRepository;
        this.queueAnalyticsRepository = queueAnalyticsRepository;
    }

    public String createQueue(QueueRequest request) {

        Queue queue = Queue.builder()
                .queueName(request.getQueueName())
                .serviceType(request.getServiceType())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .averageServiceTime(request.getAverageServiceTime())
                .rating(request.getRating())
                .phoneNumber(request.getPhoneNumber())
                .active(true)
                .status(QueueStatus.OPEN)
                .createdAt(LocalDateTime.now())
                .build();

        queueRepository.save(queue);

        return "Queue Created Successfully";
    }

    public List<Queue> getAllQueues(){

        return queueRepository.findAll();
    }

    public String joinQueue(
            JoinQueueRequest request){

        System.out.println("User ID = " + request.getUserId());
        System.out.println("Queue ID = " + request.getQueueId());

        User user = userRepository
                .findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Queue queue = queueRepository
                .findById(request.getQueueId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Queue not found"));

        Long currentQueueSize = tokenRepository.getCurrentQueueSize(queue.getQueueId());

        if (currentQueueSize >= queue.getMaxCapacity()) {
            throw new RuntimeException("Queue is full.");
        }

        Long count =
                tokenRepository.countByQueueQueueId(
                        queue.getQueueId());

        Token token = Token.builder()
                .user(user)
                .queue(queue)
                .tokenNumber(count.intValue() + 1)
                .joinTime(LocalDateTime.now())
                .scheduledTime(request.getScheduledTime())   // <-- Add this
                .status(TokenStatus.WAITING)
                .estimatedWait(count.intValue() * queue.getAverageServiceTime())
                .build();
        tokenRepository.save(token);

        return "Token Created : "
                + token.getTokenNumber();
    }

    public List<Token> getUserTokens(Long userId) {

        return tokenRepository.findByUserUserId(userId);
    }

    public Token getTokenStatus(
            Long tokenId){

        return tokenRepository
                .findById(tokenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Token not found"));
    }

    public QueueStatusResponse
    getQueueStatus(Long tokenId){

        Token token = tokenRepository
                .findById(tokenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Token not found"));

        Long peopleAhead =
                tokenRepository
                        .countByQueueQueueIdAndTokenNumberLessThanAndStatus(

                                token.getQueue()
                                        .getQueueId(),

                                token.getTokenNumber(),
                                TokenStatus.WAITING
                        );

        return QueueStatusResponse
                .builder()
                .tokenNumber(
                        token.getTokenNumber())
                .position(
                        peopleAhead.intValue())
                .estimatedWait(
                        peopleAhead.intValue()*5)
                .status(
                        token.getStatus().name())
                .build();
    }

    public String serveNextToken(
            Long queueId){

        Token token =
                tokenRepository

                        .findFirstByQueueQueueIdAndStatusOrderByTokenNumberAsc(

                                queueId,
                                TokenStatus.WAITING
                        )

                        .orElse(null);

        if(token == null){

            return "No waiting tokens";
        }

        token.setStatus(
                TokenStatus.SERVING);

        token.setServedTime(
                LocalDateTime.now());

        tokenRepository.save(
                token);

        return "Serving Token : "
                + token.getTokenNumber();
    }

    public String openCounter(
            CounterRequest request){

        Queue queue =
                queueRepository
                        .findById(
                                request.getQueueId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Queue not found"));

        Counter counter =
                Counter.builder()

                        .queue(queue)

                        .counterName(
                                request.getCounterName())

                        .avgServiceTime(
                                request.getAvgServiceTime())

                        .isActive(true)

                        .build();

        counterRepository.save(counter);

        return "Counter Opened";
    }

    public String closeCounter(
            Long counterId){

        Counter counter =
                counterRepository
                        .findById(counterId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Counter not found"));

        counter.setIsActive(false);

        counterRepository.save(counter);

        return "Counter Closed";
    }

    public String cancelToken(Long tokenId) {

        try {

            Token token = tokenRepository.findById(tokenId)
                    .orElseThrow(() -> new ResourceNotFoundException("Token not found"));

            if (token.getStatus() != TokenStatus.WAITING) {
                throw new RuntimeException("Only waiting tokens can be cancelled");
            }

            token.setStatus(TokenStatus.CANCELLED);
            tokenRepository.save(token);

            return "Token Cancelled Successfully";

        } catch (Exception e) {
            return e.getClass().getName() + " : " + e.getMessage();
        }
    }

    public AnalyticsResponse getAnalytics() {

        List<QueueAnalytics> analytics =
                queueAnalyticsRepository.findAll();

        double avgWait =
                analytics.stream()
                        .mapToDouble(QueueAnalytics::getAvgWaitTime)
                        .average()
                        .orElse(0);

        long customers =
                analytics.stream()
                        .mapToLong(QueueAnalytics::getCustomersServed)
                        .sum();

        String busiestHour =
                analytics.stream()
                        .max((a,b)->Integer.compare(
                                a.getCustomersServed(),
                                b.getCustomersServed()))
                        .map(QueueAnalytics::getPeakHour)
                        .orElse("N/A");

        return AnalyticsResponse.builder()

                .activeQueues(
                        queueRepository.countByStatus(QueueStatus.OPEN))

                .waitingTokens(
                        tokenRepository.countByStatus(TokenStatus.WAITING))

                .servingTokens(
                        tokenRepository.countByStatus(TokenStatus.SERVING))

                .completedTokens(
                        tokenRepository.countByStatus(TokenStatus.COMPLETED))

                .averageWaitTime(avgWait)

                .totalCustomersServed(customers)

                .busiestHour(busiestHour)

                .build();
    }

    public List<TrendResponse> getQueueTrend() {

        return queueAnalyticsRepository.findAll()
                .stream()
                .map(a -> TrendResponse.builder()
                        .day(a.getDate().getDayOfWeek().name())
                        .customers(a.getCustomersServed())
                        .build())
                .toList();
    }

    public List<DistributionResponse> getQueueDistribution() {

        return tokenRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        token -> token.getQueue().getServiceType().name(),
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(entry -> DistributionResponse.builder()
                        .queueType(entry.getKey())
                        .totalCustomers(entry.getValue())
                        .build())
                .toList();
    }

    public List<TopQueueResponse> getTopQueues() {

        return queueRepository.findAll()
                .stream()
                .map(queue -> {

                    long customers = tokenRepository.findAll()
                            .stream()
                            .filter(token -> token.getQueue().getQueueId().equals(queue.getQueueId()))
                            .count();

                    return TopQueueResponse.builder()
                            .queueName(queue.getQueueName())
                            .customers(customers)
                            .averageWait(
                                    queue.getAverageServiceTime() == null
                                            ? 0.0
                                            : queue.getAverageServiceTime().doubleValue()
                            )
                            .rating(
                                    queue.getRating() == null
                                            ? 0.0
                                            : queue.getRating()
                            )
                            .build();

                })
                .sorted((a, b) -> Long.compare(b.getCustomers(), a.getCustomers()))
                .limit(5)
                .toList();
    }

    public List<RecentActivityResponse> getRecentActivities() {

        return tokenRepository.findTop10ByOrderByJoinTimeDesc()
                .stream()
                .map(token -> {

                    String activity;
                    String type;

                    switch (token.getStatus()) {

                        case WAITING -> {
                            activity = token.getUser().getName()
                                    + " joined "
                                    + token.getQueue().getQueueName();
                            type = "JOIN";
                        }

                        case SERVING -> {
                            activity = "Token "
                                    + token.getTokenNumber()
                                    + " is being served at "
                                    + token.getQueue().getQueueName();
                            type = "SERVING";
                        }

                        case COMPLETED -> {
                            activity = "Token "
                                    + token.getTokenNumber()
                                    + " completed at "
                                    + token.getQueue().getQueueName();
                            type = "COMPLETED";
                        }

                        case CANCELLED -> {
                            activity = token.getUser().getName()
                                    + " cancelled queue "
                                    + token.getQueue().getQueueName();
                            type = "CANCELLED";
                        }

                        default -> {
                            activity = "Queue Updated";
                            type = "INFO";
                        }
                    }

                    return RecentActivityResponse.builder()
                            .activity(activity)
                            .type(type)
                            .time(
                                    token.getJoinTime() == null
                                            ? "N/A"
                                            : token.getJoinTime()
                                            .toLocalTime()
                                            .withNano(0)
                                            .toString()
                            )
                            .build();

                })
                .toList();
    }

    public List<HeatmapResponse> getHeatmapData() {

        List<Queue> queues = queueRepository.findAll();

        return queues.stream().map(queue -> {

            int waiting = (int) tokenRepository.findAll()
                    .stream()
                    .filter(t ->
                            t.getQueue().getQueueId().equals(queue.getQueueId()) &&
                                    t.getStatus() == TokenStatus.WAITING)
                    .count();

            int wait =
                    queue.getAverageServiceTime() == null
                            ? 0
                            : waiting * queue.getAverageServiceTime();

            String congestion;

            if (waiting < 5)
                congestion = "LOW";
            else if (waiting < 15)
                congestion = "MEDIUM";
            else
                congestion = "HIGH";

            return HeatmapResponse.builder()
                    .queueId(queue.getQueueId())
                    .queueName(queue.getQueueName())
                    .latitude(queue.getLatitude())
                    .longitude(queue.getLongitude())
                    .waitingTokens(waiting)
                    .estimatedWait(wait)
                    .congestion(congestion)
                    .rating(queue.getRating())
                    .build();

        }).toList();
    }

    public CustomerAnalyticsResponse getCustomerAnalytics(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        List<Token> tokens =
                tokenRepository.findByUserUserId(user.getUserId());

        long joined = tokens.size();

        long completed = tokens.stream()
                .filter(t -> t.getStatus() == TokenStatus.COMPLETED)
                .count();

        long cancelled = tokens.stream()
                .filter(t -> t.getStatus() == TokenStatus.CANCELLED)
                .count();

        double averageWait = tokens.stream()
                .filter(t ->
                        t.getJoinTime() != null &&
                                t.getServedTime() != null)
                .mapToLong(t ->
                        Duration.between(
                                t.getJoinTime(),
                                t.getServedTime()
                        ).toMinutes())
                .average()
                .orElse(0);

        long totalTimeSaved = completed * 15;

        double efficiencyScore =
                joined == 0
                        ? 0
                        : (completed * 100.0) / joined;

        Map<String, Long> activity =
                tokens.stream()

                        .collect(Collectors.groupingBy(

                                t -> t.getJoinTime()
                                        .toLocalDate()
                                        .getDayOfWeek()
                                        .name(),

                                Collectors.counting()

                        ));

        List<DailyActivityResponse> chart =

                activity.entrySet()

                        .stream()

                        .map(e ->

                                DailyActivityResponse.builder()

                                        .day(e.getKey())

                                        .queues(e.getValue())

                                        .build()

                        )

                        .toList();

        return CustomerAnalyticsResponse.builder()

                .queuesJoined(joined)

                .completedVisits(completed)

                .averageWait(averageWait)

                .cancelledQueues(cancelled)

                .totalTimeSaved(totalTimeSaved)

                .efficiencyScore(efficiencyScore)

                .activity(chart)

                .build();

    }
}