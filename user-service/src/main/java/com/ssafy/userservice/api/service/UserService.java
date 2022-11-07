package com.ssafy.userservice.api.service;

import com.ssafy.userservice.api.request.UserUpdateDto;
import com.ssafy.userservice.api.response.TokenResponseDto;
import com.ssafy.userservice.api.response.UserInfoByCodedEmailDto;
import com.ssafy.userservice.api.response.UserInfoByTokenDto;
import com.ssafy.userservice.api.response.UserInfoResponseDto;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface UserService {
    UserInfoByCodedEmailDto getUserInfo(String accessToken) throws IOException;
    void updateUser(String accessToken, UserUpdateDto userUpdateDto);
    TokenResponseDto reIssue(String accessToken, String refreshToken);
    void logout(String accessToken);

    UserInfoByTokenDto getUserID(String accessToken);

    UserInfoByTokenDto getUserId(String codedEmail) ;
}
