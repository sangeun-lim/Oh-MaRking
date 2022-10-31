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
import java.util.List;
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
    @GetMapping("/omr/{id}")
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
            OMRDto omrDto = omrService.getOMR(id);
            resultMap.put("omrInfo", omrDto);
            resultMap.put("message", "게이트웨이 통신 성공");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("게이트웨이 통신 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    // 토큰 존재 X
    @ApiOperation(value = "OMR 읽기(비회원)", notes = "링크 주인의 OMR을 반환한다", response = Map.class)
    @GetMapping("/omr/{id}")
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
            resultMap.put("omrInfo", omrDto);
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
    @PostMapping("/omr")
    public ResponseEntity<Map<String, Object>> plusOMR(@RequestBody OMRDto omr, @RequestHeader("authorization") String authorization) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            omrService.addOMR(omr);
            resultMap.put("message", "OMR 카드 등록 성공");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("게이트웨이 통신 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @ApiOperation(value = "OMR 색깔 수정", notes = "OMR을 색깔을 수정한다", response = Map.class)
    @PutMapping("/omr")
    public ResponseEntity<Map<String, Object>> modifyOMR(@RequestBody OMRDto omr) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            omrService.updateColorOMR(omr);
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
