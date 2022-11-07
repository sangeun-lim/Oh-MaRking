package com.ssafy.business.api.controller;

import com.ssafy.business.api.request.NoteCheckDto;
import com.ssafy.business.api.request.NoteInsertDto;
import com.ssafy.business.api.request.NoteUpdateDto;
import com.ssafy.business.api.request.OMRInsertDto;
import com.ssafy.business.api.service.NoteService;
import com.ssafy.business.common.model.JsonDto;
import com.ssafy.business.common.model.Response;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/note")
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public Response<?> insertNote(@RequestBody NoteInsertDto noteInsertDto){
        return new Response<>(true, 201, "Note 추가 성공",noteService.insertNote(noteInsertDto));

    }
    @PostMapping("/check")
    public Response<?> checkPwd(@RequestBody NoteCheckDto noteCheckDto){
        return new Response<>(true,200,"응원 메시지 조회 성공(작성자)",noteService.checkPwd(noteCheckDto));
    }

    @PutMapping
    public JsonDto updateNote(@RequestBody NoteUpdateDto noteUpdateDto){
        noteService.updateNote(noteUpdateDto);
        return new JsonDto(true, 202, "응원 메시지 수정 성공");

    }

    @GetMapping("/{noteId}")
    public Response<?> readNote(@RequestHeader("authorization") String authorization,@PathVariable Long noteId) throws IOException {
        return new Response<>(true,200,"응원 메시지 조회 성공(수험생)",noteService.readNote(authorization,noteId));
    }

    @DeleteMapping("/{noteId}")
    public Response<?> deleteNote(@PathVariable Long noteId){
        return new Response<>(true, 200, "응원 메시지 삭제 성공",noteService.deleteNote(noteId));
    }


}
