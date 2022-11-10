package com.ssafy.userservice.common.auth;

import com.ssafy.userservice.common.exception.UserNotFoundException;
import com.ssafy.userservice.common.util.RedisService;
import com.ssafy.userservice.common.util.TokenProvider;
import com.ssafy.userservice.db.entity.User;
import com.ssafy.userservice.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Map;

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

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
        String email = (String) kakaoAccount.get("email");

        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        String id = String.valueOf(user.getId());
        String accessToken = tokenProvider.createAccessToken(id);
        String refreshToken = tokenProvider.createRefreshToken(id);

        redisService.setValues(id, refreshToken, Duration.ofDays(7));
        String url = makeRedirectUrl(accessToken, refreshToken,user.getCodedEmail());
        log.info(url);
        if (response.isCommitted()) {
            log.debug("응답이 이미 커밋된 상태입니다. " + url + "로 리다이렉트하도록 바꿀 수 없습니다.");
            return;
        }

        getRedirectStrategy().sendRedirect(request, response, user.getCodedEmail());
    }

    private String makeRedirectUrl(String accessToken, String refreshToken,String email) {
        return UriComponentsBuilder.fromUriString(env.getProperty("front.url"))
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .queryParam("codedEmail",email)
                .build().toUriString();
    }
}
