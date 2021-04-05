package com.fss.onboard.repository;

import com.fss.onboard.domain.Bankverification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bankverification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankverificationRepository extends JpaRepository<Bankverification, Long> {

    Bankverification findByBankverificationId(Integer id);
}
