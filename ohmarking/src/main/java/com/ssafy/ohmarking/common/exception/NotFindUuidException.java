package com.ssafy.ohmarking.common.exception;

public class NotFindUuidException extends RuntimeException{
    public NotFindUuidException() {
        super("uuid에 해당하는 아이디를 찾지 못했습니다.");
    }

    public NotFindUuidException(String message) {
        super(message);
    }

    public NotFindUuidException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFindUuidException(Throwable cause) {
        super(cause);
    }

    protected NotFindUuidException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
