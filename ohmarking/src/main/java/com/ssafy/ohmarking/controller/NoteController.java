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

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/note")
public class NoteController {
    private static final Logger logger = LoggerFactory.getLogger(NoteController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @ApiOperation(value = "응원글 등록", notes = "응원글을 입력한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @PostMapping
    public ResponseEntity<Map<String, Object>> writeNote(@RequestBody NoteDto note) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("note", noteService.insertNote(note));
            resultMap.put("message", SUCCESS);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 수정", notes = "응원글 id에 맞는 응원글을 수정한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @PutMapping("/modify")
    public ResponseEntity<Map<String,Object>> updateBoard(@RequestBody NoteDto note) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("note",noteService.updateNote(note));
            resultMap.put("message",SUCCESS);
        } catch (Exception e) {
            resultMap.put("message",FAIL);
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 삭제", notes = "응원글을 삭제한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteNote(@RequestBody NoteDto note) {
        Map<String,Object> resultMap = new HashMap<>();
        try {
            // 삭제할 응원글 번호(id)와 등록시 비밀번호
            noteService.deleteNote(note.getId(),note.getPwd());
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.ACCEPTED);
        }
    }
}
