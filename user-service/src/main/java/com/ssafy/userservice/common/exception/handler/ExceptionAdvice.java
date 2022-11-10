package com.ssafy.userservice.common.exception.handler;

import com.ssafy.userservice.common.exception.AccessDeniedException;
import com.ssafy.userservice.common.exception.TokenNotFoundException;
import com.ssafy.userservice.common.exception.TooLongIntroductionException;
import com.ssafy.userservice.common.exception.UserNotFoundException;
import com.ssafy.userservice.common.model.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> userNotFoundException(UserNotFoundException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> tooLongIntroductionException(TooLongIntroductionException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

    @ExceptionHandler(TokenNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> tokenNotFoundException(TokenNotFoundException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> accessDeniedException(AccessDeniedException e) {
        return new Response<>(false, 400, e.getMessage(), null);
    }

}
