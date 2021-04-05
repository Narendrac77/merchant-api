package com.fss.onboard.repository;

import com.fss.onboard.domain.BusinessLegal;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BusinessLegal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessLegalRepository extends JpaRepository<BusinessLegal, Long> {
}
