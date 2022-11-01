package com.ssafy.ohmarking.controller;

import com.ssafy.ohmarking.dto.NoteDto;
import com.ssafy.ohmarking.service.NoteService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
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

    @ApiOperation(value = "작성한 Note 보기", notes = "비밀번호를 확인하여 작성한 Note를 확인한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @PostMapping
    public ResponseEntity<Map<String, Object>> writeNote(@RequestBody long id, @RequestBody String  pwd) {
        Map<String, Object> resultMap = new HashMap<>();
        NoteDto noteDto = new NoteDto(id, pwd);
        try {
            noteService.findNote(noteDto);
            // 굳이 resultMap 에 넣을 필요 없지만 일단 넣어주고 본다
            resultMap.put("noteDto", noteService.insertNote(noteDto));
            resultMap.put("message", SUCCESS);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 수정", notes = "응원글 id에 맞는 응원글을 수정한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @PutMapping
    public ResponseEntity<Map<String, Object>> updateBoard(@RequestBody NoteDto note) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("note", noteService.updateNote(note));
            resultMap.put("message", SUCCESS);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 삭제", notes = "응원글을 삭제한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteNote(@RequestBody NoteDto note) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            // 삭제할 응원글 번호(id)와 등록시 비밀번호
            noteService.deleteNote(note.getId(), note.getPwd());
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.ACCEPTED);
        }
    }
}
