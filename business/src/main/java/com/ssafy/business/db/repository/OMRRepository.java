package com.ssafy.business.db.repository;

import com.ssafy.business.db.entity.OMR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OMRRepository extends JpaRepository<OMR, Long> {
//    OMR findById(Long id) throws Exception;
    OMR findAllById(Long id);
//    @Query(value ="SELECT * FROM OMR WHERE user_id = ?1",nativeQuery = true)
    List<OMR> getAllByUserid(Long user_id);


}
