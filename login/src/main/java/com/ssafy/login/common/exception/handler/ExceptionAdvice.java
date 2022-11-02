package com.ssafy.login.common.exception.handler;


import com.ssafy.login.common.exception.NotFindIdException;
import com.ssafy.login.common.exception.TokenNotFoundException;
import com.ssafy.login.common.exception.UserNotFoundException;
import com.ssafy.login.common.model.Response;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(NotFindIdException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> notFindUuidException(NotFindIdException e){
        return new Response<>(false,400,  e.getMessage(),null);
    }


    @ExceptionHandler(SecurityException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> securityException(SecurityException e){
        return new Response<>(false, 400,"잘못된 JWT 서명입니다.", null);

    }

    @ExceptionHandler(MalformedJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> malformedJwtException(MalformedJwtException e){
        return new Response<>(false, 400,"잘못된 JWT 서명입니다.", null);

    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> expiredJwtException(ExpiredJwtException e){
        return new Response<>(false, 400,"만료된 JWT 토큰입니다.", null);

    }

    @ExceptionHandler(UnsupportedJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> unsupportedJwtException(UnsupportedJwtException e){
        return new Response<>(false, 400,"지원되지 않는 JWT 토큰입니다.", null);

    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> illegalArgumentException(IllegalArgumentException e){
        return new Response<>(false, 400,"JWT 토큰이 잘못되었습니다.", null);

    }

    @ExceptionHandler(TokenNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> tokenNotFoundException(TokenNotFoundException e){
        return new Response<>(false,400, e.getMessage(), null);

    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> userNotFoundException(UserNotFoundException e){
        return new Response<>(false,400, e.getMessage(), null);

    }

    @ExceptionHandler(SignatureException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> SignatureException(SignatureException e){
        return new Response<>(false, 400,e.getMessage(), null);

    }
}
