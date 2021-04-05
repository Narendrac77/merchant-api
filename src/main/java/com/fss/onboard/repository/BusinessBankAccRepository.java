package com.fss.onboard.repository;

import com.fss.onboard.domain.BusinessBankAcc;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BusinessBankAcc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessBankAccRepository extends JpaRepository<BusinessBankAcc, Long> {
}
