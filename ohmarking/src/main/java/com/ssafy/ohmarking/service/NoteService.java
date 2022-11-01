package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.NoteDto;

public interface NoteService {
    NoteDto insertNote(NoteDto noteDto) throws Exception;
    void findNote(NoteDto noteDto) throws Exception;
    NoteDto updateNote(NoteDto noteDto) throws Exception;
    void deleteNote(Long id, String inputPwd) throws Exception;
}
