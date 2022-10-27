package com.ssafy.ohmarking.repository;

import com.ssafy.ohmarking.entity.OMR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OMRRepository extends JpaRepository<OMR, Long> {
}
