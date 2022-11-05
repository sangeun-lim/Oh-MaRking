package com.ssafy.business.db.repository;

import com.ssafy.business.db.entity.Note;
import com.ssafy.business.db.entity.OMR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findById(Long id);
    List<Note> findByNickname(String nickname);
    List<Note> findAllByOmr(OMR omr);
}
