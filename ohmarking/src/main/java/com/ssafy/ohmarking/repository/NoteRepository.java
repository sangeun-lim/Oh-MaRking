package com.ssafy.ohmarking.repository;

import com.ssafy.ohmarking.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Note findByIdAndPwd(Long id, String pwd) throws Exception;
    Optional<Note> findById(Long id);
}
