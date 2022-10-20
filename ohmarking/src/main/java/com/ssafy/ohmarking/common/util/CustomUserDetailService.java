package com.ssafy.ohmarking.common.util;


import com.ssafy.sharemind.common.exception.UserNotFoundException;
import com.ssafy.sharemind.common.model.CustomUserDetails;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service("userDetailService")
@Slf4j
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    // username이 DB에 있는지 확인
    @Override
    public UserDetails loadUserByUsername(String uuid) throws UsernameNotFoundException {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        return CustomUserDetails.builder()
                .id(user.getUuid())
                .email(user.getEmail())
                .build();
    }
}