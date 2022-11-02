package com.ssafy.login.db.repository;
import com.ssafy.login.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    void deleteById(Long id);

    Optional<User> findByEmail(String email);

}
