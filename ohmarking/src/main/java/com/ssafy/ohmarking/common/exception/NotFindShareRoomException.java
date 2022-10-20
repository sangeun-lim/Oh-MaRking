package com.ssafy.ohmarking.common.exception;

public class NotFindShareRoomException extends RuntimeException{

    public NotFindShareRoomException() {
        super("id 및 uuid에 해당하는 쉐어룸을 찾지 못했습니다.");
    }
    public NotFindShareRoomException(String message) {
        super(message);
    }

    public NotFindShareRoomException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFindShareRoomException(Throwable cause) {
        super(cause);
    }

    protected NotFindShareRoomException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
