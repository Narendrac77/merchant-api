package com.fss.onboard.repository;

import com.fss.onboard.domain.FileModel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FileModel entity.
 */
@Repository
public interface FileModelRepository extends JpaRepository<FileModel, Long> {
}
