package com.ssafy.business.api.controller;

import com.ssafy.business.api.service.OMRService;
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

    @GetMapping("{omr_id}")
    public Response<?> getOMR(@RequestHeader("authorization") String authorization,@PathVariable long omr_id) throws IOException {
        return new Response<>(true,200,"(로그인 유저)omr id로 omr 정보 조회 성공",omrService.getOMRByOMRIdAndToken(authorization,omr_id));
    }

    @GetMapping("/guest/{omr_id}")
    public Response<?> getOMR(@PathVariable long omr_id)  {
        return new Response<>(true,200,"(비로그인 유저)omr id로 omr 정보 조회 성공",omrService.getOMRByOMRId(omr_id));
    }



}
