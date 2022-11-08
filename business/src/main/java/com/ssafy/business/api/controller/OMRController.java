package com.ssafy.business.api.controller;

import com.ssafy.business.api.request.OMRInsertDto;
import com.ssafy.business.api.request.OMRUpdateDto;
import com.ssafy.business.api.service.OMRService;
import com.ssafy.business.common.model.JsonDto;
import com.ssafy.business.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/omr")
public class OMRController {

    private final OMRService omrService;


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/list/{user_id}")
    @ApiOperation(value = "OMR 리스트 조회", notes = "user id로 OMR id list를 조회한다.")
    public Response<?> getOMRList(@PathVariable Long user_id){
        return new Response<>(true,200,"user id로 omr 조회 성공",omrService.getOMRNumsByUserId(user_id));

    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/user/{omrId}")
    @ApiOperation(value = "OMR 조회(로그인 유저)", notes = "로그인 유저가 OMR 카드를 조회했을 때 정보를 반환한다.")
    public Response<?> getOMR(@RequestHeader("authorization") String authorization,@PathVariable long omrId) throws IOException {
        return new Response<>(true,200,"링크 주인 OMR 정보 조회 성공",omrService.getOMRByOMRIdAndToken(authorization,omrId));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/guest/{omrId}")
    @ApiOperation(value = "OMR 조회(비로그인 )", notes = "로그인 하지 않은 사용자가 OMR 카드를 조회했을 때 정보를 반환한다.")
    public Response<?> getOMR(@PathVariable long omrId) throws IOException {
        return new Response<>(true,200,"(비로그인 유저)omr id로 omr 정보 조회 성공",omrService.getOMRByOMRId(omrId));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{user_id}")
    @ApiOperation(value = "OMR 추가", notes = "OMR을 추가한다.(최초 회원가입 시, 인증 서버에서 요청함)")
    public Response<?> makeOMRUserJoin(@PathVariable long user_id){
        return new Response<>(true,201,"회원가입 회원 OMR추가 성공",omrService.makeOMRUserJoin(user_id));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @ApiOperation(value = "OMR 등록", notes = "새로운 OMR 카드를 등록한다.")
    public Response<?> insertOMR(@RequestBody OMRInsertDto omrInsertDto){
        return new Response<>(true, 201, "OMR 추가 성공",omrService.insertOMR(omrInsertDto));

    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/color")
    @ApiOperation(value = "OMR 색상 변경", notes = "OMR 카드의 색상을 변경한다.")
    public JsonDto changeColor(@RequestHeader("authorization") String authorization, @RequestBody OMRUpdateDto omrUpdateDto) throws IOException {
        System.out.println("changeColor");
        omrService.changeColor(authorization, omrUpdateDto);
        return new JsonDto(true, 202, "OMR 색상 변경 성공");
    }




}
