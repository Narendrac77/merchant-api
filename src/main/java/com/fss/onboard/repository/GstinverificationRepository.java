package com.fss.onboard.repository;

import com.fss.onboard.domain.Gstinverification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Gstinverification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GstinverificationRepository extends JpaRepository<Gstinverification, Long> {

    Gstinverification findByGstinverificationId(Integer id);
}
