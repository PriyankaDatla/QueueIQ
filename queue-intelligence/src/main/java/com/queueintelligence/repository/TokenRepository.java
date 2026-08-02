package com.queueintelligence.repository;

import com.queueintelligence.entity.Token;
import com.queueintelligence.entity.enums.TokenStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository
        extends JpaRepository<Token, Long> {
    Long countByStatus(TokenStatus status);
    Long countByQueueQueueId(
            Long queueId);
    List<Token> findTop10ByOrderByJoinTimeDesc();
    List<Token> findByUserUserId(Long userId);
    Optional<Token> findByTokenId(Long tokenId);
    Long countByQueueQueueIdAndTokenNumberLessThanAndStatus(
            Long queueId,
            Integer tokenNumber,
            TokenStatus status
    );
    @Query("""
    SELECT COUNT(t)
    FROM Token t
    WHERE t.queue.queueId = :queueId
    AND t.status = com.queueintelligence.entity.enums.TokenStatus.WAITING
    """)
    Long getCurrentQueueSize(@Param("queueId") Long queueId);
    Optional<Token>
    findFirstByQueueQueueIdAndStatusOrderByTokenNumberAsc(

            Long queueId,
            TokenStatus status
    );
}