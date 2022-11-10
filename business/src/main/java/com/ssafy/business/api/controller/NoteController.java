package com.ssafy.business.api.controller;

import com.ssafy.business.api.request.*;
import com.ssafy.business.api.service.NoteService;
import com.ssafy.business.common.model.JsonDto;
import com.ssafy.business.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/note")
public class NoteController {

    private final NoteService noteService;
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @ApiOperation(value = "응원 메시지 등록", notes = "응원 메시지(Note)를 등록한다.")
    public Response<?> insertNote(@RequestBody NoteInsertDto noteInsertDto){
        return new Response<>(true, 201, "Note 추가 성공",noteService.insertNote(noteInsertDto));

    }
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/guest/{noteId}")
    @ApiOperation(value = "응원 메시지 보기(비로그인)", notes = "메시지 정보를 반환한다.")
    public Response<?> guestNote(@PathVariable Long noteId){
        return new Response<>(true,200,"응원 메시지 조회 성공(비로그인)",noteService.guestNote(noteId));
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/check")
    @ApiOperation(value = "노트 비밀번호 체크(비로그인)", notes = "비밀번호가 일치하면 응원 메시지 정보를 반환한다.")
    public Response<?> checkPwd(@RequestBody NoteCheckDto noteCheckDto){
        return new Response<>(true,200,"응원 메시지 비밀번호 체크 성공(작성자)",noteService.checkPwd(noteCheckDto));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping
    @ApiOperation(value = "응원 메시지 수정", notes = "응원 메시지의 내용, 공개날짜를 수정한다.")
    public JsonDto updateNote(@RequestBody NoteUpdateDto noteUpdateDto){
        noteService.updateNote(noteUpdateDto);
        return new JsonDto(true, 202, "응원 메시지 수정 성공");

    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{noteId}")
    @ApiOperation(value = "응원 메시지 보기(로그인)", notes = "로그인 유저 응원 메시지 정보를 반환한다.")
    public Response<?> readNote(@RequestHeader("authorization") String authorization,@PathVariable Long noteId) throws IOException {
        return new Response<>(true,200,"응원 메시지 조회 성공(로그인)",noteService.readNote(authorization,noteId));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{noteId}")
    @ApiOperation(value = "응원 메시지 삭제", notes = "응원 메시지를 삭제한다.")
    public Response<?> deleteNote(@PathVariable Long noteId){
        return new Response<>(true, 200, "응원 메시지 삭제 성공",noteService.deleteNote(noteId));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/search/{nickname}")
    @ApiOperation(value = "작성자로 검색", notes = "작성자 닉네임이 일치하는 응원 메시지 리스트를 반환한다.")
    public Response<?> NoteListByNickname(@PathVariable String nickname){
        return new Response<>(true, 200, "응원 메시지 작성자로 검색 성공",noteService.getNoteList(nickname));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/favorite")
    @ApiOperation(value = "응원 메시지 즐겨찾기", notes = "응원 메시지를 즐겨찾기 등록/취소한다.")
    public JsonDto updateFavoriteNote(@RequestHeader("authorization") String authorization,@RequestBody NoteFavoriteDto noteFavoriteDto) throws IOException {
        noteService.updateFavoriteNote(authorization,noteFavoriteDto);
        return new JsonDto(true, 202, "응원 메시지 즐겨찾기 등록/해제 성공");

    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/favorites")
    @ApiOperation(value = "즐겨찾기 목록 조회", notes = "즐겨찾기한 응원 메시지들의 리스트를 반환한다.")
    public Response<?> updateFavoriteNote(@RequestHeader("authorization") String authorization) throws IOException {
        return new Response<>(true, 200, "즐겨찾기 목록 조회 성공",noteService.getFavoriteList(authorization));

    }


}
