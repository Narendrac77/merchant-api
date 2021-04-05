package com.fss.onboard.repository;

import com.fss.onboard.domain.Panverification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Panverification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PanverificationRepository extends JpaRepository<Panverification, Long> {
 Panverification findByPanverificationId(Integer id);
}
