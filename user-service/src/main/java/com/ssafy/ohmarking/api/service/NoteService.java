package com.ssafy.ohmarking.api.service;

import com.ssafy.ohmarking.api.request.*;
import com.ssafy.ohmarking.api.response.NoteInfoResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface NoteService {
    String updateFavorite(String accessToken, FavoriteDto favoriteDto);

    List<NoteInfoResponseDto> getFavoriteList(String codedEmail);

    List<NoteInfoResponseDto> searchByNickname(String nickname);

    NoteInfoResponseDto getNoteInfo(String accessToken, Long noteId);

    NoteInfoResponseDto getNoteInfo(CheckNoteDto checkNoteDto);

    Map<String, Object> deleteNote(Long noteId);

    void updateNote(NoteUpdateDto noteUpdateDto);

    Map<String, Long> writeNote(NoteRegisterDto noteRegisterDto);
}
