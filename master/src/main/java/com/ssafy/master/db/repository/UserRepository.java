package com.ssafy.master.db.repository;
import com.ssafy.master.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCodedEmail(String codedEmail);
    Optional<User> findByEmail(String email);
}
