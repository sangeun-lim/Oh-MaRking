package com.ssafy.login.api.controller;


import com.ssafy.login.api.request.UserUpdateDto;
import com.ssafy.login.api.service.UserService;
import com.ssafy.login.common.model.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public Response<?> getUserDetail(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, 200, "회원 정보 조회 성공", userService.userInfoByToken(authorization.replace("Bearer ", "")));
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping
    public Response<?> updateUser(@RequestHeader("authorization") String authorization, @RequestBody UserUpdateDto userUpdateDto) {
        return new Response<>(true, 202, "회원 정보 수정 성공", userService.updateUser(authorization.replace("Bearer ", ""), userUpdateDto));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping
    public Response<?> deleteUser(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, 200, "회원 탈퇴 성공", userService.deleteUser(authorization.replace("Bearer ", "")));
    }
}
