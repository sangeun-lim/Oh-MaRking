package com.ssafy.userservice.api.service;

import com.ssafy.userservice.api.request.UserUpdateDto;
import com.ssafy.userservice.api.response.TokenResponseDto;
import com.ssafy.userservice.api.response.UserInfoResponseDto;
import com.ssafy.userservice.common.exception.UserNotFoundException;
import com.ssafy.userservice.common.util.RedisService;
import com.ssafy.userservice.common.util.TokenProvider;
import com.ssafy.userservice.db.entity.User;
import com.ssafy.userservice.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final RedisService redisService;

    @Override
    public void updateUser(String accessToken, UserUpdateDto userUpdateDto) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);

        user.updateUser(userUpdateDto);
    }

    @Override
    @Transactional(readOnly = true)
    public UserInfoResponseDto getUserInfo(String coded_email) {
        User user = userRepository.findByCodedEmail(coded_email).orElseThrow(UserNotFoundException::new);

        UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.builder()
                .id(user.getId())
                .coded_email(user.getCoded_email())
                .nickname(user.getNickname())
                .introduction(user.getIntroduction())
                .build();

        return userInfoResponseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public TokenResponseDto reIssue(String accessToken, String refreshToken) {
        tokenProvider.validateToken(refreshToken);
        String uid = tokenProvider.getUserId(refreshToken);
        String findRefreshToken = redisService.getValue(uid);

        if (findRefreshToken == null || !findRefreshToken.equals(refreshToken)) {
            throw new UserNotFoundException("refreshToken을 찾을 수 없습니다.");
        } else {
            return TokenResponseDto.builder()
                    .accessToken(tokenProvider.createAccessToken(uid))
                    .build();
        }
    }

    @Override
    public void logout(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);

        userRepository.findById(Long.parseLong(uid))
                .orElseThrow(() -> new UserNotFoundException("수험생 정보를 찾을 수 없습니다."));
        redisService.deleteValues(uid);
    }
}
