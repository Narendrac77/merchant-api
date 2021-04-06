package com.fss.onboard.repository;

import com.fss.onboard.domain.PanDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PanDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PanDetailsRepository extends JpaRepository<PanDetails, Long> {

    PanDetails findByMid(String mid);
}
