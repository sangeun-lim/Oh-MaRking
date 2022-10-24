package com.ssafy.ohmarking.db.repository;

import com.ssafy.ohmarking.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
