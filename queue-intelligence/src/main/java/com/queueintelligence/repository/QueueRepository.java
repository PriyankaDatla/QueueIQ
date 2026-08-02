package com.queueintelligence.repository;

import com.queueintelligence.entity.Queue;
import com.queueintelligence.entity.enums.QueueStatus;
import com.queueintelligence.entity.enums.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueueRepository extends JpaRepository<Queue, Long> {

    List<Queue> findByServiceTypeAndActiveTrueAndStatus(
            ServiceType serviceType,
            QueueStatus status
    );

    long countByStatus(QueueStatus status);
}