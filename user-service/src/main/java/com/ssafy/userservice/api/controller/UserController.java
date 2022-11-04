package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.request.UserUpdateDto;
import com.ssafy.userservice.api.response.TokenResponseDto;
import com.ssafy.userservice.api.service.UserService;
import com.ssafy.userservice.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/info/{codedEmail}")
    @ApiOperation(value = "수험생 정보 조회", notes = "수험생 아이디, 닉네임, 자기소개를 반환한다.")
    public Response<?> getUserInfo(@PathVariable String codedEmail) {
        return new Response<>(true, 200, "수험생 정보 조회 성공", userService.getUserInfo(codedEmail));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping
    @ApiOperation(value = "수험생 정보 수정", notes = "수험생 닉네임, 자기소개를 수정한다.")
    public Response<?> updateUser(@RequestHeader("authorization") String authorization, @RequestBody UserUpdateDto userUpdateDto) {
        userService.updateUser(authorization.replace("Bearer ", ""), userUpdateDto);
        return new Response<>(true, 202, "수험생 정보 수정 성공", null);
    }

    @GetMapping("/token/reissuance/{refreshToken}")
    public ResponseEntity<TokenResponseDto> reIssue(@RequestHeader("authorization") String authorization,
                                                    @PathVariable String refreshToken) {
        return new ResponseEntity<>(userService.reIssue(authorization.replace("Bearer ", ""),
                refreshToken), HttpStatus.CREATED);
    }

    @GetMapping("/info")
    public Response<?> getUserByToken(@RequestHeader("authorization") String authorization){
        return new Response<>(true,200,"토큰으로 수험생 id 조회 성공",userService.getUserID(authorization.replace("Bearer ", "")));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/info/id/{codedEmail}")
    @ApiOperation(value = "수험생 정보 조회", notes = "수험생 아이디, 닉네임, 자기소개를 반환한다.")
    public Response<?> getUserId(@PathVariable String codedEmail) {
        return new Response<>(true, 200, "수험생 정보 조회 성공", userService.getUserId(codedEmail));
    }
}
