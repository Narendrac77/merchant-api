package com.fss.onboard.repository;

import com.fss.onboard.domain.BuisnessInfo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BuisnessInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BuisnessInfoRepository extends JpaRepository<BuisnessInfo, Long> {
}
