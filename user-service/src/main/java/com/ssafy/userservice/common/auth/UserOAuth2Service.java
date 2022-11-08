package com.ssafy.userservice.common.auth;

import com.ssafy.userservice.db.entity.User;
import com.ssafy.userservice.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserOAuth2Service extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    @Value("${api-server.url}")
    private String base_url;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
        String email = (String) kakao_account.get("email");

        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        String name = (String) properties.get("nickname");

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            String introduction = "자기소개를 입력해주세요.";
            log.info("가입되지 않은 사용자입니다. DB에 저장합니다.");
            userRepository.save(User.builder()
                    .email(email)
                    .name(name)
                    .codedEmail(encodeEmail(email))
                    .introduction(introduction)
                    .build());
            User temp=userRepository.findByEmail(email).orElse(null);
            try {
                makeOMR(temp.getId());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_MEMBER")), attributes, "id");
    }
    public void makeOMR(Long user_id) throws IOException {
        URL url=new URL(base_url+"/api/omr/"+user_id);
        HttpURLConnection connection=(HttpURLConnection)url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type","apllication/json; utf-8");
        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));



    }

    private String encodeEmail(String email){
        LocalDateTime now = LocalDateTime.now();
        int hash = 17;
        hash = 31 * hash + email.hashCode();
        hash = 31 * hash + now.hashCode();
        hash = hash & 0x7fffffff;

        return "OMR-" + hash;
    }

}