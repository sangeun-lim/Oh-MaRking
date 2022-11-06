package com.ssafy.ohmarking.api.controller;

import com.ssafy.ohmarking.api.request.UserUpdateDto;
import com.ssafy.ohmarking.api.service.UserService;
import com.ssafy.ohmarking.common.model.JsonDto;
import com.ssafy.ohmarking.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/info/{codedEmail}")
    @ApiOperation(value = "수험생 정보 조회", notes = "수험생 정보와 omr id 리스트를 반환한다.")
    public Response<?> getUserInfo(@PathVariable String codedEmail) {
        return new Response<>(true, 200, "수험생 정보 조회 성공", userService.getLinkInfo(codedEmail));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping
    @ApiOperation(value = "수험생 정보 수정", notes = "수험생 닉네임, 자기소개를 수정한다.")
    public JsonDto updateUser(@RequestHeader("authorization") String authorization, @RequestBody UserUpdateDto userUpdateDto) {
        userService.updateUser(authorization.replace("Bearer ", ""), userUpdateDto);
        return new JsonDto(true, 202, "수험생 정보 수정 성공");
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/reissuance/{refreshToken}")
    @ApiOperation(value = "토큰 재발급", notes = "만료된 JWT accessToken을 재발급한다.")
    public Response<?> reIssue(@RequestHeader("authorization") String authorization,
                                                    @PathVariable String refreshToken) {
        return new Response<>(true, 201, "토큰 재발급 성공",
                userService.reIssue(authorization.replace("Bearer ", ""), refreshToken));
//        return new ResponseEntity<>(userService.reIssue(authorization.replace("Bearer ", ""),
//                refreshToken), HttpStatus.CREATED);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/email")
    @ApiOperation(value = "암호화 된 이메일 조회", notes = "토큰으로 암호화 된 이메일 정보를 조회한다.")
    public Response<?> getCodedEmail(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, 200, "암호화 된 이메일 조회 성공", userService.getCodedEmail(authorization.replace("Bearer ", "")));
    }

}
