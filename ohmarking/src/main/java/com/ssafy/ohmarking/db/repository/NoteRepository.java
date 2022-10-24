package com.ssafy.ohmarking.db.repository;

import com.ssafy.ohmarking.db.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

}
