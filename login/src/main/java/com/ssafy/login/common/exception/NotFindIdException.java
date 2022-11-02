package com.ssafy.login.common.exception;


public class NotFindIdException extends RuntimeException{
    public NotFindIdException() {
        super("id에 해당하는 아이디를 찾지 못했습니다.");
    }

    public NotFindIdException(String message) {
        super(message);
    }

    public NotFindIdException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFindIdException(Throwable cause) {
        super(cause);
    }

    protected NotFindIdException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
