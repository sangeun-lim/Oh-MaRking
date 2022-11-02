package com.ssafy.login.api.service;


import com.ssafy.login.api.request.UserUpdateDto;
import com.ssafy.login.api.response.*;
import com.ssafy.login.common.exception.UserNotFoundException;
import com.ssafy.login.common.util.RedisService;
import com.ssafy.login.common.util.TokenProvider;
import com.ssafy.login.db.entity.User;
import com.ssafy.login.db.repository.UserRepository;
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
    public UserResponseDto updateUser(String accessToken, UserUpdateDto userUpdateDto) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);

        user.updateUser(userUpdateDto);

        UserResponseDto userResponseDto = UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .introduction(user.getIntroduction())
                .link(user.getLink())
                .build();
        return userResponseDto;
    }

    @Override
    public boolean deleteUser(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);
        userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);
        userRepository.deleteById(Long.parseLong(uid));
        redisService.deleteValues(uid);
        return true;
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
    @Transactional(readOnly = true)
    public UserResponseDto userInfoByToken(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);

        User user = userRepository.findById(Long.parseLong(uid))
                .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없습니다."));

        return UserResponseDto.builder()
                .id(Long.parseLong(uid))
                .name(user.getName())
                .email(user.getEmail())
                .introduction(user.getIntroduction())
                .link(user.getLink())
                .build();
    }

    @Override
    public void logout(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);

        userRepository.findById(Long.parseLong(uid))
                .orElseThrow(() -> new UserNotFoundException("회원 정보를 찾을 수 없습니다."));
        redisService.deleteValues(uid);
    }
}
