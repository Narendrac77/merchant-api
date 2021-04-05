package com.fss.onboard.repository;

import com.fss.onboard.domain.BusinessLegalContact;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BusinessLegalContact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessLegalContactRepository extends JpaRepository<BusinessLegalContact, Long> {
}
