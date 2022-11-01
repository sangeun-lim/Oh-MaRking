package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.NoteDto;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface NoteService {
    void insertNote(long omrId, String nickname, String content, String pwd, Date showDate, int problemNum, int checkNum) throws Exception;
    NoteDto seeNote(NoteDto noteDto) throws Exception;
    NoteDto showNote(Long id) throws Exception;
    void updateNote(NoteDto noteDto) throws Exception;
    void deleteNote(Long id) throws Exception;
    List<NoteDto> findNote(String nickname);
}
