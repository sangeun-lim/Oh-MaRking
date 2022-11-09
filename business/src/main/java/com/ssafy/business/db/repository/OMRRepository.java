package com.ssafy.business.db.repository;

import com.ssafy.business.db.entity.OMR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OMRRepository extends JpaRepository<OMR, Long> {
    OMR findAllById(Long id);
    List<OMR> getAllByUserid(Long user_id);


    @Query("select count(id) from OMR where userid =?1")
    int getOMRCount(Long userId);
}
