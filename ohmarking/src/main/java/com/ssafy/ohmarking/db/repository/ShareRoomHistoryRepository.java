package com.ssafy.ohmarking.db.repository;

import com.ssafy.sharemind.db.entity.ShareRoomHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShareRoomHistoryRepository extends JpaRepository<ShareRoomHistory, Long> {

    Optional<ShareRoomHistory> findById(long id);
}
