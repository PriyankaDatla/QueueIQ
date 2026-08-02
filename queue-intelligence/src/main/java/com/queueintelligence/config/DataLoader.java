package com.queueintelligence.config;

import com.queueintelligence.entity.Queue;
import com.queueintelligence.entity.enums.QueueStatus;
import com.queueintelligence.entity.enums.ServiceType;
import com.queueintelligence.repository.QueueRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadQueues(QueueRepository repository) {

        return args -> {

            if(repository.count() > 0)
                return;

            repository.save(
                    Queue.builder()
                            .queueName("Government General Hospital")
                            .serviceType(ServiceType.HOSPITAL)
                            .address("Jagannaickpur, Kakinada")
                            .latitude(16.9547)
                            .longitude(82.2384)
                            .maxCapacity(120)
                            .averageServiceTime(12)
                            .rating(4.2)
                            .phoneNumber("0884-2361000")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("Apollo Clinic")
                            .serviceType(ServiceType.HOSPITAL)
                            .address("Bhanugudi Junction, Kakinada")
                            .latitude(16.9668)
                            .longitude(82.2361)
                            .maxCapacity(60)
                            .averageServiceTime(10)
                            .rating(4.6)
                            .phoneNumber("0884-2372100")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("Medicover Hospitals")
                            .serviceType(ServiceType.HOSPITAL)
                            .address("Ramanayyapeta, Kakinada")
                            .latitude(16.9754)
                            .longitude(82.2435)
                            .maxCapacity(90)
                            .averageServiceTime(15)
                            .rating(4.5)
                            .phoneNumber("0884-2322200")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("MeeSeva Center")
                            .serviceType(ServiceType.GOVERNMENT)
                            .address("Bhanugudi, Kakinada")
                            .latitude(16.9628)
                            .longitude(82.2355)
                            .maxCapacity(40)
                            .averageServiceTime(8)
                            .rating(4.1)
                            .phoneNumber("1800-425-1110")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("Passport Seva Kendra")
                            .serviceType(ServiceType.GOVERNMENT)
                            .address("Ramanayyapeta, Kakinada")
                            .latitude(16.9748)
                            .longitude(82.2462)
                            .maxCapacity(70)
                            .averageServiceTime(18)
                            .rating(4.4)
                            .phoneNumber("1800-258-1800")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("RTO Office Kakinada")
                            .serviceType(ServiceType.GOVERNMENT)
                            .address("Ramanayyapeta, Kakinada")
                            .latitude(16.9736)
                            .longitude(82.2510)
                            .maxCapacity(80)
                            .averageServiceTime(20)
                            .rating(3.9)
                            .phoneNumber("0884-2365600")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("State Bank of India")
                            .serviceType(ServiceType.BANK)
                            .address("Main Road, Kakinada")
                            .latitude(16.9459)
                            .longitude(82.2388)
                            .maxCapacity(45)
                            .averageServiceTime(7)
                            .rating(4.3)
                            .phoneNumber("1800-1234")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("Union Bank of India")
                            .serviceType(ServiceType.BANK)
                            .address("Main Road, Kakinada")
                            .latitude(16.9495)
                            .longitude(82.2365)
                            .maxCapacity(40)
                            .averageServiceTime(6)
                            .rating(4.1)
                            .phoneNumber("1800-2222")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("D-Mart Billing Counter")
                            .serviceType(ServiceType.SHOPPING)
                            .address("Sarpavaram Junction, Kakinada")
                            .latitude(16.9891)
                            .longitude(82.2486)
                            .maxCapacity(50)
                            .averageServiceTime(4)
                            .rating(4.5)
                            .phoneNumber("0884-2450000")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

            repository.save(
                    Queue.builder()
                            .queueName("Kakinada Railway Reservation Counter")
                            .serviceType(ServiceType.GOVERNMENT)
                            .address("Kakinada Town Railway Station")
                            .latitude(16.9417)
                            .longitude(82.2354)
                            .maxCapacity(60)
                            .averageServiceTime(9)
                            .rating(4.2)
                            .phoneNumber("139")
                            .active(true)
                            .status(QueueStatus.OPEN)
                            .createdAt(LocalDateTime.now())
                            .build()
            );

        };
    }
}