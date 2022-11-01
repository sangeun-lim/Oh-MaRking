package com.ssafy.ohmarking.controller;

import com.ssafy.ohmarking.dto.NoteDto;
import com.ssafy.ohmarking.service.NoteService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/note")
public class NoteController {
    private static final Logger logger = LoggerFactory.getLogger(NoteController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private NoteService noteService;

    @ApiOperation(value = "응원글 등록", notes = "응원글을 입력한다. 그리고 DB 입력 성공여부 메세지를 반환한다.", response = Map.class)
    @PostMapping
    public ResponseEntity<Map<String, Object>> writeNote(@RequestBody long omrId, @RequestBody String nickname, @RequestBody String content, @RequestBody String pwd, @RequestBody Instant showDate, @RequestBody int problemNum, @RequestBody int checkNum) {
        Map<String, Object> resultMap = new HashMap<>();
        NoteDto noteDto = new NoteDto(omrId, nickname, content, pwd, showDate, problemNum, checkNum);
        try {
            // 굳이 resultMap 에 넣을 필요 없지만 일단 넣어주고 본다
            // resultMap.put("noteDto", noteService.insertNote(noteDto));
            noteService.insertNote(noteDto);
            resultMap.put("message", SUCCESS);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "작성한 Note 보기 (작성자)", notes = "비밀번호를 확인하여 작성한 Note를 확인한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @PostMapping
    public ResponseEntity<Map<String, Object>> seeNote(@RequestBody long id, @RequestBody String pwd) {
        Map<String, Object> resultMap = new HashMap<>();
        NoteDto noteDto = new NoteDto(id, pwd);
        try {
            resultMap.put("returnNote", noteService.seeNote(noteDto));
            resultMap.put("message", SUCCESS);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "작성된 Note 보기 (수험생)", notes = "작성된 Note를 확인한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> showNote(
            @PathVariable("id")
            @ApiParam(
                    name = "id",
                    type = "Long",
                    value = "Note 고유 id",
                    required = true) Long id
    ) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("returnNote", noteService.showNote(id));
            resultMap.put("message", SUCCESS);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 수정", notes = "응원글 id에 맞는 응원글을 수정한다. 그리고 DB 입력 성공여부 메세지를 반환한다.", response = Map.class)
    @PutMapping
    public ResponseEntity<Map<String, Object>> updateBoard(@RequestBody long id, @RequestBody String nickname, @RequestBody String content, @RequestBody Instant showDate) {
        Map<String, Object> resultMap = new HashMap<>();
        NoteDto noteDto = new NoteDto(id, nickname, content, showDate);
        try {
            noteService.updateNote(noteDto);
            resultMap.put("message", SUCCESS);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 삭제", notes = "응원글을 삭제한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @DeleteMapping
    public ResponseEntity<String> deleteNote(@RequestBody long id) {
        NoteDto noteDto = new NoteDto(id);
        try {
            // 삭제할 응원글 번호(id)와 등록시 비밀번호
            noteService.deleteNote(noteDto.getId());
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.ACCEPTED);
        }
    }

    @ApiOperation(value = "응원글 검색", notes = "응원글 nickname에 맞는 글을 검색한다. 그리고 DB 입력 성공여부 메세지를 반환한다.", response = Map.class)
    @GetMapping("search/{nickname}")
    public ResponseEntity<Map<String, Object>> searchNote(
            @PathVariable("nickname")
            @ApiParam(
                    name = "nickname",
                    type = "String",
                    value = "Note 작성자",
                    required = true) String nickname
    ) {
        Map<String, Object> resultMap = new HashMap<>();
        List<NoteDto> refineNoteList = new ArrayList<>();
        try {
            List<NoteDto> listNoteDtos = noteService.findNote(nickname);
            for (int i = 0; i<listNoteDtos.size(); i++) {
                NoteDto returnNoteDto = new NoteDto(
                        listNoteDtos.get(i).getId(),
                        listNoteDtos.get(i).getPageNum(),
                        listNoteDtos.get(i).getDate(),
                        listNoteDtos.get(i).getShowDate(),
                        listNoteDtos.get(i).getProblemNum(),
                        listNoteDtos.get(i).getCheckNum());
                refineNoteList.add(returnNoteDto);
            }
            resultMap.put("noteList", refineNoteList);
            resultMap.put("message", SUCCESS);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
