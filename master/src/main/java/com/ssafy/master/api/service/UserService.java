package com.ssafy.master.api.service;



import com.ssafy.master.api.request.UserUpdateDto;
import com.ssafy.master.api.response.TokenResponseDto;
import com.ssafy.master.api.response.UserInfoResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserInfoResponseDto getUserInfo(String accessToken);
    void updateUser(String accessToken, UserUpdateDto userUpdateDto);
    TokenResponseDto reIssue(String accessToken, String refreshToken);
    void logout(String accessToken);
}

