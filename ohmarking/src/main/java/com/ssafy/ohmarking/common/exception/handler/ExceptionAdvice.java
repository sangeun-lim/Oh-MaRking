package com.ssafy.ohmarking.common.exception.handler;

import com.ssafy.sharemind.common.exception.*;
import com.ssafy.sharemind.common.model.Response;
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

    @ExceptionHandler(NotFindUuidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> notFindUuidException(NotFindUuidException e){
        return new Response<>(false,  e.getMessage(),null);
    }

    @ExceptionHandler(NotFindQuestionException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> notFindQuestionException(NotFindQuestionException e){
        return new Response<>(false, e.getMessage(), null);

    }

    @ExceptionHandler(NotFindShareRoomException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> notFindShareRoomException(NotFindShareRoomException e){
        return new Response<>(false, e.getMessage(), null);

    }


    @ExceptionHandler(SecurityException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> securityException(SecurityException e){
        return new Response<>(false, "잘못된 JWT 서명입니다.", null);

    }

    @ExceptionHandler(MalformedJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> malformedJwtException(MalformedJwtException e){
        return new Response<>(false, "잘못된 JWT 서명입니다.", null);

    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> expiredJwtException(ExpiredJwtException e){
        return new Response<>(false, "만료된 JWT 토큰입니다.", null);

    }

    @ExceptionHandler(UnsupportedJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> unsupportedJwtException(UnsupportedJwtException e){
        return new Response<>(false, "지원되지 않는 JWT 토큰입니다.", null);

    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> illegalArgumentException(IllegalArgumentException e){
        return new Response<>(false, "JWT 토큰이 잘못되었습니다.", null);

    }

    @ExceptionHandler(TokenNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> tokenNotFoundException(TokenNotFoundException e){
        return new Response<>(false, e.getMessage(), null);

    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> userNotFoundException(UserNotFoundException e){
        return new Response<>(false, e.getMessage(), null);

    }

    @ExceptionHandler(SignatureException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> SignatureException(SignatureException e){
        return new Response<>(false, e.getMessage(), null);

    }
}
