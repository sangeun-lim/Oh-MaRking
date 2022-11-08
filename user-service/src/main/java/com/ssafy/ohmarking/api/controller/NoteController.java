package com.ssafy.ohmarking.api.controller;

import com.ssafy.ohmarking.api.request.*;
import com.ssafy.ohmarking.api.service.NoteService;
import com.ssafy.ohmarking.common.model.JsonDto;
import com.ssafy.ohmarking.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/note")
public class NoteController {
    private final NoteService noteService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @ApiOperation(value = "응원 메시지 등록", notes = "응원 메시지를 등록한다.")
    public Response<?> writeNote(@RequestBody NoteRegisterDto noteRegisterDto) {
        return new Response<>(true, 201, "응원 메시지 등록 성공", noteService.writeNote(noteRegisterDto));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping
    @ApiOperation(value = "응원 메시지 수정", notes = "응원 메시지의 내용, 공개날짜를 수정한다.")
    public JsonDto updateNote(@RequestBody NoteUpdateDto noteUpdateDto) {
        noteService.updateNote(noteUpdateDto);
        return new JsonDto(true, 202, "응원 메시지 수정 성공");
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/del/{noteId}")
    @ApiOperation(value = "응원 메시지 삭제", notes = "응원 메시지를 삭제한다.")
    public Response<?> deleteNote(@PathVariable Long noteId) {
        return new Response<>(true, 200, "응원 메시지 삭제 성공", noteService.deleteNote(noteId));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/favorite")
    @ApiOperation(value = "응원 메시지 즐겨찾기", notes = "응원 메시지를 즐겨찾기 등록/취소한다.")
    public JsonDto updateFavorite(@RequestHeader("authorization") String authorization, @RequestBody FavoriteDto favoriteDto) {
        return new JsonDto(true, 202, noteService.updateFavorite(authorization.replace("Bearer ", ""), favoriteDto));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/favorites")
    @ApiOperation(value = "즐겨찾기 목록 조회", notes = "즐겨찾기한 응원 메시지들의 리스트를 반환한다.")
    public Response<?> getFavoriteList(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, 200, "즐겨찾기 목록 조회 성공", noteService.getFavoriteList(authorization.replace("Bearer ", "")));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/search/{nickname}")
    @ApiOperation(value = "작성자로 검색", notes = "작성자 닉네임이 일치하는 응원 메시지 리스트를 반환한다.")
    public Response<?> searchByNickname(@PathVariable String nickname) {
        return new Response<>(true, 200, "응원 메시지 작성자로 검색 성공", noteService.searchByNickname(nickname));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{noteId}")
    @ApiOperation(value = "응원 메시지 보기(로그인)", notes = "토큰이 있는 사용자가 수험생일 경우 응원 메시지 정보를 반환한다.")
    public Response<?> showNote(@RequestHeader("authorization") String authorization, @PathVariable Long noteId) {
        return new Response<>(true, 200, "응원 메시지 조회 성공(수험생)", noteService.getNoteInfo(authorization.replace("Bearer ", ""), noteId));
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/check")
    @ApiOperation(value = "응원 메시지 보기(비로그인)", notes = "비밀번호가 일치하면 응원 메시지 정보를 반환한다.")
    public Response<?> showNote(@RequestBody CheckNoteDto checkNoteDto) {
        return new Response<>(true, 200, "응원 메시지 조회 성공(작성자)", noteService.getNoteInfo(checkNoteDto));
    }
}
