package com.ssafy.login.api.service;



import com.ssafy.login.api.request.UserRegisterDto;
import com.ssafy.login.api.request.UserUpdateDto;
import com.ssafy.login.api.response.TokenResponseDto;
import com.ssafy.login.api.response.UserResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface UserService {

    UserResponseDto updateUser(String accessToken, UserUpdateDto userUpdateDto);
    boolean deleteUser(String accessToken);
    TokenResponseDto reIssue(String accessToken, String refreshToken);
    UserResponseDto userInfoByToken(String accessToken);
    void logout(String accessToken);
}
