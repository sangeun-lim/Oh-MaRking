package com.ssafy.business.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.BeanNameViewResolver;

@Configuration
//@ComponentScan
//@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Bean
    public BeanNameViewResolver beanNameViewResolver() {
        BeanNameViewResolver beanNameViewResolver = new BeanNameViewResolver();
        beanNameViewResolver.setOrder(0);
        return beanNameViewResolver;
    }

    private static final String[] EXCLUDE_PATHS = {"/logic/omr/**","/logic/note/**","/logic/event/**","/swagger-resources/**","/swagger-ui/**","/logic/omr/user/*","/logic/**","/logic/*"};

//    private JwtInterceptor jwtInterceptor;
//    @Autowired
//    public WebConfig(JwtInterceptor jwtInterceptor) {
//        this.jwtInterceptor = jwtInterceptor;
//    }


    //  Interceptor를 이용해서 처리하므로 전역의 Cross Origin 처리를 해준다.
    @Override
    public void addCorsMappings(CorsRegistry registry) {
//		default 설정.
//		Allow all origins.
//		Allow "simple" methods GET, HEAD and POST.
//		Allow all headers.
//		Set max age to 1800 seconds (30 minutes).
        registry.addMapping("/**")
//			.allowedOrigins("http://localhost:8080", "http://localhost:8081")
                .allowedOrigins("http://127.0.0.1:3000", "http://localhost:3000", "https://k7c102.p.ssafy.io", "http://k7c102.p.ssafy.io:8082", "http://k7c102.p.ssafy.io:8083","http://k7c102.p.ssafy.io","https://k7c102.p.ssafy.io:8082","https://k7c102.p.ssafy.io:8083")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(6000);
    }

}
