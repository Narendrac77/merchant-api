package com.fss.onboard.repository;

import com.fss.onboard.domain.GstinDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GstinDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GstinDetailsRepository extends JpaRepository<GstinDetails, Long> {
   GstinDetails  findByMid(String mid);
}
