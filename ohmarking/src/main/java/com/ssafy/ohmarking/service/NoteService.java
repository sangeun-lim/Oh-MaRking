package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.NoteDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NoteService {
    NoteDto insertNote(NoteDto noteDto) throws Exception;
    NoteDto seeNote(NoteDto noteDto) throws Exception;
    NoteDto showNote(Long id) throws Exception;
    void updateNote(NoteDto noteDto) throws Exception;
    void deleteNote(Long id) throws Exception;
    List<NoteDto> findNote(String nickname);
}
