package com.ssafy.ohmarking.db.repository;

import com.ssafy.ohmarking.db.entity.OMR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OMRRepository extends JpaRepository<OMR, Long> {
    @Query("select o.id from OMR o where o.user.id =:userId")
    List<Long> findOMRIdList(Long userId);

    @Query("select count(o.id) from OMR o where o.user.id =:userId")
    int getOMRCount(Long userId);
}
