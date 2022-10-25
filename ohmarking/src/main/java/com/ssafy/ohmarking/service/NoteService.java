package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.NoteDto;

public interface NoteService {
    NoteDto insertNote(NoteDto note) throws Exception;
    NoteDto updateNote(NoteDto note) throws Exception;
    void deleteNote(Long id, String pwd) throws Exception;
}
