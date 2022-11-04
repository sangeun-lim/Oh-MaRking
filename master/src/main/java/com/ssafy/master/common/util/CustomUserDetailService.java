package com.ssafy.master.common.util;



import com.ssafy.master.common.exception.UserNotFoundException;
import com.ssafy.master.common.model.CustomUserDetails;
import com.ssafy.master.db.entity.User;
import com.ssafy.master.db.repository.UserRepository;
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

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userRepository.findById(Long.parseLong(id))
                .orElseThrow(UserNotFoundException::new);

        return CustomUserDetails.builder()
                .id(user.getId())
                .email(user.getEmail())
                .build();
    }
}
