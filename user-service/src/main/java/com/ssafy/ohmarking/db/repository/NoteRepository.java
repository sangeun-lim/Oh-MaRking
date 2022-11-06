package com.ssafy.ohmarking.db.repository;

import com.ssafy.ohmarking.db.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    @Query("select n from Note n where n.omr.user.id =:userId and n.isFavorite = true")
    List<Note> findFavoritesByUserId(Long userId);
    List<Note> findAllByNickname(String nickname);

    @Query("select count(n.id) from Note n where n.omr.user.id =:userId and n.omr.pageNum =:pageNum")
    int getNoteCount(Long userId, Integer pageNum);

    @Query("select count(n.id) from Note n where n.omr.id =:omrId")
    int getNoteCount(Long omrId);
}
