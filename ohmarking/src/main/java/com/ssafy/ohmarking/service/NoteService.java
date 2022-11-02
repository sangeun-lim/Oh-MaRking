package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.NoteDto;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public interface NoteService {
    void insertNote(long omrId, String nickname, String content, String pwd, String showDate, int problemNum, int checkNum) throws Exception;
    NoteDto seeNote(long id, String pwd) throws Exception;
    NoteDto showNote(long id) throws Exception;
    void updateNote(long id, String nickname, String content, String showDate) throws Exception;
    void deleteNote(long id) throws Exception;
    List<NoteDto> findNote(String nickname);
}
