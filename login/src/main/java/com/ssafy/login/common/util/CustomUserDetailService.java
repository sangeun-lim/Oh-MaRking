package com.ssafy.login.common.util;



import com.ssafy.login.common.exception.UserNotFoundException;
import com.ssafy.login.common.model.CustomUserDetails;
import com.ssafy.login.db.entity.User;
import com.ssafy.login.db.repository.UserRepository;
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
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        User user = userRepository.findById(Long.parseLong(id))
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        return CustomUserDetails.builder()
                .id(user.getId())
                .email(user.getEmail())
                .intoduction(user.getIntroduction())
                .link(user.getLink())
                .build();
    }


}
