package com.ssafy.ohmarking.api.service;

import com.ssafy.ohmarking.api.request.UserUpdateDto;
import com.ssafy.ohmarking.api.response.LinkInfoResponseDto;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface UserService {
    LinkInfoResponseDto getLinkInfo(String accessToken);
    void updateUser(String accessToken, UserUpdateDto userUpdateDto);
    Map<String, String> reIssue(String accessToken, String refreshToken);
    void logout(String accessToken);

    Map<String, String> getCodedEmail(String accessToken);
}
