package com.ssafy.master.common.exception;


public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {super("수험생 정보를 찾을 수 없습니다.");}

    public UserNotFoundException(String msg) {super(msg);}

    public UserNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public UserNotFoundException(Throwable cause) {super(cause);}

    protected UserNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}