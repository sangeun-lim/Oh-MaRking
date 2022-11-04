package com.ssafy.ohmarking.controller;

import com.ssafy.ohmarking.dto.OMRDto;
import com.ssafy.ohmarking.service.OMRService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/omr")
public class OMRController {
    private static final Logger logger = LoggerFactory.getLogger(OMRController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private OMRService omrService;

    // 토큰 존재 O
    @ApiOperation(value = "OMR 읽기(회원)", notes = "본인 소유의 OMR을 반환한다", response = Map.class)
    @GetMapping("/user/{id}")
    public ResponseEntity<Map<String, Object>> showUserOMR(
            @RequestHeader("authorization") String authorization,
            @PathVariable("id")
            @ApiParam(
                    name = "id",
                    type = "Long",
                    value = "OMR 고유 id",
                    required = true) Long id,
            HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            // 인가받은 사용자라면 (로그인한 사용자라면)
//            logger.debug("로그인 토큰정보 : {}", token);
//            resultMap.put("access-token", token);
            if(authorization != null) {
                // 프론트에서 해당 OMR id가 PathVariable로 넘어왔으므로 해당 OMR에 대한 정보를 불러온다
                OMRDto omrDto = omrService.getOMR(id);
                omrDto.setOwner(true); // isOwner

                // omrDto 라는 이름으로 API 문서에 맞게 리턴타입 반환
                OMRDto omrReturnDto = new OMRDto(omrDto.getColor(), omrDto.getPageNum(), omrDto.getOmrInfo(), omrDto.getNoteInfo(), omrDto.isOwner());
                resultMap.put("omrDto", omrReturnDto);
                resultMap.put("message", "게이트웨이 통신 성공");
                status = HttpStatus.ACCEPTED;
            }
        } catch (Exception e) {
            logger.error("게이트웨이 통신 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    // 토큰 존재 X
    @ApiOperation(value = "OMR 읽기(비회원)", notes = "링크 주인의 OMR을 반환한다", response = Map.class)
    @GetMapping("/guest/{id}")
    public ResponseEntity<Map<String, Object>> seeUserOMR(
            @PathVariable("id")
            @ApiParam(
                    name = "id",
                    type = "Long",
                    value = "OMR 고유 id",
                    required = true) Long id,
            HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            OMRDto omrDto = omrService.getOMR(id);
            OMRDto omrReturnDto = new OMRDto(omrDto.getColor(), omrDto.getPageNum(), omrDto.getOmrInfo(), omrDto.getNoteInfo(), omrDto.isOwner());
            resultMap.put("omrDto", omrReturnDto);
            resultMap.put("message", "게이트웨이 통신 성공");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("게이트웨이 통신 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @ApiOperation(value = "OMR 등록 (페이지 추가)", notes = "OMR을 추가한다", response = Map.class)
    @PostMapping
    public ResponseEntity<Map<String, Object>> plusOMR(@RequestBody Map<String, String> map) {
        // @RequestBody long userId, int color, int pageNum
        long userId = Long.parseLong(map.get("userId"));
        int color = Integer.parseInt(map.get("color"));
        int pageNum = Integer.parseInt(map.get("pageNum"));

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            // omrService.addOMR(userId, color, pageNum);
            resultMap.put("omrId", omrService.addOMR(userId, color, pageNum).getId());
            resultMap.put("message", "OMR 카드 등록 성공");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("게이트웨이 통신 실패 : {카드 등록 실패}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @ApiOperation(value = "OMR 색깔 수정", notes = "OMR을 색깔을 수정한다", response = Map.class)
    @PutMapping
    public ResponseEntity<Map<String, Object>> modifyOMR(@RequestBody Map<String, String> map) {
        // @RequestBody long id, int color
        long id = Long.parseLong(map.get("id"));
        int color = Integer.parseInt(map.get("color"));

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            omrService.updateColorOMR(id, color);
            resultMap.put("message", "OMR 카드 색깔 변경 성공");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("게이트웨이 통신 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}
