package com.ssafy.userservice.api.service;

import com.ssafy.userservice.api.request.UserUpdateDto;
import com.ssafy.userservice.api.response.TokenResponseDto;
import com.ssafy.userservice.api.response.UserInfoResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserInfoResponseDto getUserInfo(String accessToken);
    void updateUser(String accessToken, UserUpdateDto userUpdateDto);
    TokenResponseDto reIssue(String accessToken, String refreshToken);
    void logout(String accessToken);
}
