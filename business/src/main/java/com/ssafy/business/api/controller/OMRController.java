package com.ssafy.business.api.controller;

import com.ssafy.business.api.request.OMRInsertDto;
import com.ssafy.business.api.request.OMRUpdateDto;
import com.ssafy.business.api.service.OMRService;
import com.ssafy.business.common.model.JsonDto;
import com.ssafy.business.common.model.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/omr")
public class OMRController {

    private final OMRService omrService;

    @GetMapping("/list/{user_id}")
    public Response<?> getOMRList(@PathVariable Long user_id){
        return new Response<>(true,200,"user id로 omr 조회 성공",omrService.getOMRNumsByUserId(user_id));

    }

    @GetMapping("/user/{omr_id}")
    public Response<?> getOMR(@RequestHeader("authorization") String authorization,@PathVariable long omr_id) throws IOException {
        return new Response<>(true,200,"링크 주인 OMR 정보 조회 성공",omrService.getOMRByOMRIdAndToken(authorization,omr_id));
    }

    @GetMapping("/guest/{omr_id}")
    public Response<?> getOMR(@PathVariable long omr_id) throws IOException {
        return new Response<>(true,200,"(비로그인 유저)omr id로 omr 정보 조회 성공",omrService.getOMRByOMRId(omr_id));
    }

    @PostMapping("{user_id}")
    public Response<?> makeOMRUserJoin(@PathVariable long user_id){
        return new Response<>(true,201,"회원가입 회원 OMR추가 성공",omrService.makeOMRUserJoin(user_id));
    }

    @PostMapping
    public Response<?> insertOMR(@RequestBody OMRInsertDto omrInsertDto){
        return new Response<>(true, 201, "OMR 추가 성공",omrService.insertOMR(omrInsertDto));

    }

    @PutMapping("/color")
    public JsonDto changeColor(@RequestHeader("authorization") String authorization, @RequestBody OMRUpdateDto omrUpdateDto) throws IOException {
        System.out.println("changeColor");
        omrService.changeColor(authorization, omrUpdateDto);
        return new JsonDto(true, 202, "OMR 색상 변경 성공");
    }




}
