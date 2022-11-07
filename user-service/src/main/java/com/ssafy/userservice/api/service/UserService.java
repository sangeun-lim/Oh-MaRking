package com.ssafy.userservice.api.service;

import com.ssafy.userservice.api.request.UserUpdateDto;
import com.ssafy.userservice.api.response.*;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface UserService {
    UserInfoByCodedEmailDto getUserInfo(String codedEmail) throws IOException;
    void updateUser(String accessToken, UserUpdateDto userUpdateDto);
    TokenResponseDto reIssue(String accessToken, String refreshToken);
    void logout(String accessToken);

    UserInfoByTokenDto getUserID(String accessToken);

    UserInfoByTokenDto getUserId(String codedEmail) ;

    UserInfoResponseDto getUserInfoByUserid(Long user_id);

    UserEmailResponseDto getUserEmailByToken(String accessToken);
}
