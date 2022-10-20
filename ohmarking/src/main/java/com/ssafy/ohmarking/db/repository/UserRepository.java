package com.ssafy.ohmarking.db.repository;

import com.ssafy.sharemind.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUuid(String uuid);

    void deleteByUuid(String uuid);

    Optional<User> findByEmail(String email);
}
