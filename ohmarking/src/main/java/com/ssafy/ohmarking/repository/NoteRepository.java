package com.ssafy.ohmarking.repository;

import com.ssafy.ohmarking.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Note findByIdAndPwd(Long id, String pwd) throws Exception;

    /** Note 중 id는 하나씩 할당되므로 findById / findByAll 상관 없음) **/
    // getReferenceById 로 대체한 것도 있음
    Optional<Note> findById(Long id);
    Note findByAll(Long id);

    // 반환하는 Note가 여러개일수 있으므로 List로 반환
    List<Note> findByNickname(String nickname);
}
