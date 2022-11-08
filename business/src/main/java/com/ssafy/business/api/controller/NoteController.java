package com.ssafy.business.api.controller;

import com.ssafy.business.api.request.*;
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

    @GetMapping("/search/{nickname}")
    public Response<?> NoteListByNickname(@PathVariable String nickname){
        return new Response<>(true, 200, "응원 메시지 작성자로 검색 성공",noteService.getNoteList(nickname));
    }

    @PutMapping("/favorite")
    public JsonDto updateFavoriteNote(@RequestHeader("authorization") String authorization,@RequestBody NoteFavoriteDto noteFavoriteDto) throws IOException {
        noteService.updateFavoriteNote(authorization,noteFavoriteDto);
        return new JsonDto(true, 202, "응원 메시지 즐겨찾기 등록/해제 성공");

    }

    @GetMapping("/favorite")
    public Response<?> updateFavoriteNote(@RequestHeader("authorization") String authorization) throws IOException {
        return new Response<>(true, 200, "즐겨찾기 목록 조회 성공",noteService.getFavoriteList(authorization));

    }


}
