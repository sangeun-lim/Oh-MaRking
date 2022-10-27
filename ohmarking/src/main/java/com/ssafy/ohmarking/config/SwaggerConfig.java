package com.ssafy.ohmarking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

/** Swagger 버전확인 **/
// Swagger3
// http://localhost:포트번호/context-path/swagger-ui/index.html
// http://localhost:8080/api/swagger-ui/index.html

// Swagger 2.9.2
// http://localhost:포트번호/context-path/swagger-ui.html
// http://localhost:8080/api/swagger-ui.html

@Configuration
@EnableSwagger2
//@EnableWebMvc
public class SwaggerConfig {
    @Bean
    public Docket postsApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("ohmarking")
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.ohmarking.controller"))
                .paths(regex("/.*"))
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("OhMarking REST API")
                .description("OhMarking Project API")
                .termsOfServiceUrl("https://edu.ssafy.com")
                .license("SSAFY License")
                .licenseUrl("ssafy@ssafy.com")
                .version("1.0")
                .build();
    }

}

