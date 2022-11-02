package com.ssafy.login.common.auth;


import com.ssafy.login.db.entity.User;
import com.ssafy.login.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserOAuth2Service extends DefaultOAuth2UserService {


    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();


        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
        String email = (String) kakao_account.get("email");

        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        String name = (String) properties.get("nickname");
        System.out.println("-------------------------------");
        System.out.println("name : "+name);
        System.out.println("email : "+email);
        System.out.println("-------------------------------");

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            log.info("가입되지 않은 사용자입니다. DB에 저장합니다.");
            userRepository.save(User.builder()
                    .email(email)
                    .name(name)
                    .introduction("자기소개를 입력해주세요")
                    .link(createLink(email))
                    .build());
        }

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_MEMBER")), attributes, "id");
    }

    private String createLink(String email){
        LocalDateTime now = LocalDateTime.now();
        int hash = 17;
        hash = 31 * hash + email.hashCode();
        hash = 31 * hash + now.hashCode();
        hash = hash & 0x7fffffff;

        return "OMR-" + hash;
    }

}