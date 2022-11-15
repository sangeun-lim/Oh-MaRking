package com.ssafy.business.db.repository;

import com.ssafy.business.db.entity.Note;
import com.ssafy.business.db.entity.OMR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findById(Long id);
    @Query("select count(id) from Note where omr.id=?1 and omr.pageNum =?2")
    int getNoteCount(Long userId, Integer pageNum);

    @Query("select count(id) from Note where omr.id =?1")
    int getNoteCount(Long omrId);
    List<Note> findByNickname(String nickname);
    List<Note> findAllByOmr(OMR omr);
    @Query("select id from Note where omr.id=?1 and checkNum =?2 and problemNum=?3")
    Optional<Note> findByOMRAndCheckNumAndProblemNum(Long omr_id,Integer checkNum,Integer problemNum);
    List<Note> findAllByNickname(String nickname);
    @Query("select n from Note n where n.omr.userid =?1 and n.isFavorite = true")
    List<Note> findFavoritesByUserId(Long userId);
    @Query("select n from Note n where n.omr.id =?1 and n.isFavorite = true")
    List<Note> findFavoritesByOMRId(Long omrId);
}
