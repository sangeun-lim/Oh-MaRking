package com.ssafy.ohmarking.db.repository;

import com.ssafy.ohmarking.db.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
