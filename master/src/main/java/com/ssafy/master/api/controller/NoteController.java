package com.ssafy.master.api.controller;


import com.ssafy.master.dto.NoteDto;
import com.ssafy.master.api.service.NoteService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/note")
public class NoteController {
    private static final Logger logger = LoggerFactory.getLogger(NoteController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

//    @Autowired
    private NoteService noteService;

    @ApiOperation(value = "응원글 등록", notes = "응원글을 입력한다. 그리고 DB 입력 성공여부 메세지를 반환한다.", response = Map.class)
    @PostMapping
    // @RequestBody는 덩어리(객체)로 넘어오기 때문에 매개변수의 나열은 컴퓨터가 인식을 못한다
    public ResponseEntity<Map<String, Object>> writeNote(@RequestBody Map<String, String> map) {
        // 프론트에서 받아온 값을 map을 통해 읽어온다
        long omrId = Long.parseLong(map.get("omrId"));
        String nickname = map.get("nickname");
        String content = map.get("content");
        String pwd = map.get("pwd");
        String showDate = map.get("showDate");
        // simpledateformat에서 parse를 사용할때는 코드가 try~catch 문 안에 있지 않으면 에러가 나기 때문에 일단 주석
        // Date showDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("showDate"));
        int problemNum = Integer.parseInt(map.get("problemNum"));
        int checkNum = Integer.parseInt(map.get("checkNum"));

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            // Date showDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("showDate"));
            // 프론트에서 받은 Parameter를 service 로직 처리에 필요하므로 보내준다
            noteService.insertNote(omrId, nickname, content, pwd, showDate, problemNum, checkNum);
            resultMap.put("message", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("응원글(Note) 등록 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "작성한 Note 보기 (작성자)", notes = "비밀번호를 확인하여 작성한 Note를 확인한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @PostMapping("/check")
    public ResponseEntity<Map<String, Object>> seeNote(@RequestBody Map<String, String> map) {
        // @RequestBody long id, @RequestBody String pwd
        long id = Long.parseLong(map.get("id"));
        String pwd = map.get("pwd");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap.put("note", noteService.seeNote(id, pwd));
            resultMap.put("message", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("작성한 응원글(Note) 보기 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "작성된 Note 보기 (수험생)", notes = "작성된 Note를 확인한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @PostMapping("/see")
    public ResponseEntity<Map<String, Object>> showNote(
//            @PathVariable("id")
            @RequestBody Map<String, String> map
//            @ApiParam(
//                    name = "id",
//                    type = "Long",
//                    value = "Note 고유 id",
//                    required = true) Long id
    ) {
        long id = Long.parseLong(map.get("id"));
        int isOpen = Integer.parseInt(map.get("isOpen"));

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap.put("note", noteService.showNote(id, isOpen));
            resultMap.put("message", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("작성된 응원글(Note) 보기 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 수정", notes = "응원글 id에 맞는 응원글을 수정한다. 그리고 DB 입력 성공여부 메세지를 반환한다.", response = Map.class)
    @PutMapping
    public ResponseEntity<Map<String, Object>> modifyNote(@RequestBody Map<String, String> map) {
        // @RequestBody long id, @RequestBody String nickname, @RequestBody String content, @RequestBody String showDate
        long id = Long.parseLong(map.get("id"));
        String nickname = map.get("nickname");
        String content = map.get("content");
        String showDate = map.get("showDate");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            noteService.updateNote(id, nickname, content, showDate);
            resultMap.put("message", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("응원글 수정 실패 : {}", e);
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 삭제", notes = "응원글을 삭제한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
    @DeleteMapping
    public ResponseEntity<String> deleteNote(@RequestBody Map<String, String> map) {
        // @RequestBody long id
        long id = Long.parseLong(map.get("id"));

        // resultMap 생성하지 않고 String으로 결과 반환하기
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            // 삭제할 응원글 번호(id)와 등록시 비밀번호
            noteService.deleteNote(id);
            status = HttpStatus.ACCEPTED;
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("응원글 삭제 실패 : {}", e);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            return new ResponseEntity<>(FAIL, HttpStatus.ACCEPTED);
        }
    }

    @ApiOperation(value = "응원글 검색", notes = "응원글 nickname에 맞는 글을 검색한다. 그리고 DB 입력 성공여부 메세지를 반환한다.", response = Map.class)
    @GetMapping("/search/{nickname}")
    public ResponseEntity<Map<String, Object>> searchNote(
            @PathVariable("nickname")
            @ApiParam(
                    name = "nickname",
                    type = "String",
                    value = "Note 작성자",
                    required = true) String nickname
    ) {
        HttpStatus status = HttpStatus.ACCEPTED;
        Map<String, Object> resultMap = new HashMap<>();
        List<NoteDto> refineNoteList = new ArrayList<>();
        try {
            List<NoteDto> listNoteDtos = noteService.findNote(nickname);
            for (int i = 0; i < listNoteDtos.size(); i++) {
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
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("응원글 검색 실패 : {}", e);
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "응원글 즐겨찾기", notes = "응원글을 즐겨찾기한다. 그리고 DB 입력 성공여부 메세지를 반환한다.", response = Map.class)
    @PutMapping("/favorite")
    public ResponseEntity<Map<String, Object>> bookmarkNote(@RequestBody Map<String, String> map) {
        long id = Long.parseLong(map.get("id"));
        int isFavorite = Integer.parseInt(map.get("isFavorite"));

        HttpStatus status = HttpStatus.ACCEPTED;
        Map<String, Object> resultMap = new HashMap<>();
        try {
            noteService.bookmarkNote(id, isFavorite);
            resultMap.put("message", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("응원글 즐겨찾기 등록/해제 실패 : {}", e);
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "즐겨찾기한 응원글 목록", notes = "즐겨찾기한 NOTE 글 리스트 목록 반환한다. 그리고 DB 입력 성공여부 메세지를 반환한다.", response = Map.class)
    @PostMapping("/favorites")
    public ResponseEntity<Map<String, Object>> showBookmarkedNotes(@RequestBody Map<String, String> map) {
        long id = Long.parseLong(map.get("id"));
        int isFavorite = Integer.parseInt(map.get("isFavorite"));

        HttpStatus status = HttpStatus.ACCEPTED;
        Map<String, Object> resultMap = new HashMap<>();

        // 최종적으로 즐겨찾기 응원글을 담을 List 선언
        List<NoteDto> refineNoteList = new ArrayList<>();
        try {
            List<NoteDto> listNoteDtos = noteService.findBookmarkNote(id, isFavorite);
            for (int i = 0; i < listNoteDtos.size(); i++) {
                NoteDto returnNoteDto = new NoteDto(
                        listNoteDtos.get(i).getPageNum(),
                        listNoteDtos.get(i).getNickname(),
                        listNoteDtos.get(i).getContent(),
                        listNoteDtos.get(i).getProblemNum(),
                        listNoteDtos.get(i).getCheckNum());
                refineNoteList.add(returnNoteDto);
            }
            resultMap.put("noteList", refineNoteList);
            resultMap.put("message", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("즐겨찾기한 응원글 목록 검색 실패 : {}", e);
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
