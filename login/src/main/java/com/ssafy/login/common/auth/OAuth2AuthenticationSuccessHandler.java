package com.ssafy.login.common.auth;


import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.login.common.exception.UserNotFoundException;
import com.ssafy.login.common.util.RedisService;
import com.ssafy.login.common.util.TokenProvider;
import com.ssafy.login.db.entity.User;
import com.ssafy.login.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RedisService redisService;
    private final Environment env;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

//        login 성공한 사용자
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
        String email = (String) kakaoAccount.get("email");
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        String id = String.valueOf(user.getId());
        String accessToken = tokenProvider.createAccessToken(id);
        String refreshToken = tokenProvider.createRefreshToken(id);
        System.out.println("-------------------------------");
        System.out.println(accessToken);
        System.out.println(refreshToken);
        System.out.println("-------------------------------");

        userRepository.findById(user.getId())
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        redisService.setValues(id, refreshToken, Duration.ofDays(7));

        String url = makeRedirectUrl(accessToken, refreshToken);

        if (response.isCommitted()) {
            log.debug("응답이 이미 커밋된 상태입니다. " + url + "로 리다이렉트하도록 바꿀 수 없습니다.");
            return;
        }

        getRedirectStrategy().sendRedirect(request, response, url);
    }

    private String makeRedirectUrl(String accessToken, String refreshToken) {
        return UriComponentsBuilder.fromUriString(env.getProperty("front.url"))
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .build().toUriString();
    }
}