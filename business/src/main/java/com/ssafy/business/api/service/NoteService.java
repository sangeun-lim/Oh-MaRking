package com.ssafy.business.api.service;

import com.ssafy.business.api.request.NoteCheckDto;
import com.ssafy.business.api.request.NoteInsertDto;
import com.ssafy.business.api.request.NoteUpdateDto;
import com.ssafy.business.api.response.NoteCheckResponseDto;
import com.ssafy.business.api.response.NoteGetResponseDto;
import com.ssafy.business.api.response.UserOMRInfo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public interface NoteService {
    Map<String, Long> insertNote(NoteInsertDto noteInsertDto);

    NoteCheckResponseDto checkPwd(NoteCheckDto noteCheckDto);

    void updateNote(NoteUpdateDto noteUpdateDto);

    NoteGetResponseDto readNote(String authorization,Long noteid) throws IOException;

    public Long getUserId(String authorization) throws IOException;

    UserOMRInfo deleteNote(Long noteId);
}
