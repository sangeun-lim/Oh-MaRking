package com.ssafy.ohmarking.db.repository;

import com.ssafy.sharemind.db.entity.QnA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {
    Optional<QnA> findById(long id);

}
