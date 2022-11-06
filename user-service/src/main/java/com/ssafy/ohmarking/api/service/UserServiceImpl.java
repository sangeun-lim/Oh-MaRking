package com.ssafy.ohmarking.api.service;

import com.ssafy.ohmarking.api.request.UserUpdateDto;
import com.ssafy.ohmarking.api.response.LinkInfoResponseDto;
import com.ssafy.ohmarking.common.exception.UserNotFoundException;
import com.ssafy.ohmarking.common.util.RedisService;
import com.ssafy.ohmarking.common.util.TokenProvider;
import com.ssafy.ohmarking.db.entity.User;
import com.ssafy.ohmarking.db.repository.OMRRepository;
import com.ssafy.ohmarking.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final OMRRepository omrRepository;
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
    public LinkInfoResponseDto getLinkInfo(String codedEmail) {
        User user = userRepository.findByCodedEmail(codedEmail).orElseThrow(UserNotFoundException::new);
        List<Long> omrList = omrRepository.findOMRIdList(user.getId());
        LinkInfoResponseDto linkInfoResponseDto = LinkInfoResponseDto.builder()
                .userId(user.getId())
                .omrList(omrList)
                .build();
        return linkInfoResponseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, String> reIssue(String accessToken, String refreshToken) {
        tokenProvider.validateToken(refreshToken);
        String uid = tokenProvider.getUserId(refreshToken);
        String findRefreshToken = redisService.getValue(uid);

        if (findRefreshToken == null || !findRefreshToken.equals(refreshToken)) {
            throw new UserNotFoundException("refreshToken을 찾을 수 없습니다.");
        } else {
            Map<String, String> map = new HashMap<>();
            map.put("accessToken", tokenProvider.createAccessToken(uid));
            return map;
//            return TokenResponseDto.builder()
//                    .accessToken(tokenProvider.createAccessToken(uid))
//                    .build();
        }
    }

    @Override
    public void logout(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);

        userRepository.findById(Long.parseLong(uid))
                .orElseThrow(() -> new UserNotFoundException("수험생 정보를 찾을 수 없습니다."));
        redisService.deleteValues(uid);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, String> getCodedEmail(String accessToken) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(() -> new UserNotFoundException("수험생 정보를 찾을 수 없습니다."));
        Map<String, String> map = new HashMap<>();
        map.put("codedEmail", user.getCodedEmail());
        return map;
    }

}
