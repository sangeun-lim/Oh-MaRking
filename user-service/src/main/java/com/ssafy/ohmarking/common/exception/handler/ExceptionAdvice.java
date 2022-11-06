package com.ssafy.ohmarking.common.exception.handler;

import com.ssafy.ohmarking.common.exception.*;
import com.ssafy.ohmarking.common.model.JsonDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public JsonDto userNotFoundException(UserNotFoundException e) {
        return new JsonDto(false, 400, e.getMessage());
    }

    @ExceptionHandler(TokenNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public JsonDto tokenNotFoundException(TokenNotFoundException e) {
        return new JsonDto(false, 400, e.getMessage());
    }

    @ExceptionHandler(OMRNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public JsonDto omrNotFoundException(OMRNotFoundException e) {
        return new JsonDto(false, 400, e.getMessage());
    }

    @ExceptionHandler(NoteNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public JsonDto noteNotFoundException(NoteNotFoundException e) {
        return new JsonDto(false, 400, e.getMessage());
    }

    @ExceptionHandler(NoteCountException.class)
    @ResponseStatus(HttpStatus.PRECONDITION_FAILED)
    public JsonDto noteCountException(NoteCountException e) {return new JsonDto(false, 412, e.getMessage());}

    @ExceptionHandler(OMRCountException.class)
    @ResponseStatus(HttpStatus.PRECONDITION_FAILED)
    public JsonDto omrCountException(OMRCountException e) {return new JsonDto(false, 412, e.getMessage());}

}
