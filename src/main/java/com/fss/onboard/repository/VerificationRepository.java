package com.fss.onboard.repository;

import com.fss.onboard.domain.Verification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Verification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VerificationRepository extends JpaRepository<Verification, Long> {

    Verification findByMid(String id);
}
