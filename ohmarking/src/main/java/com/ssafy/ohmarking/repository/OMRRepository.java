package com.ssafy.ohmarking.repository;

import com.ssafy.ohmarking.entity.OMR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OMRRepository extends JpaRepository<OMR, Long> {
    OMR findAll(Long id) throws Exception;

}
