package com.ssafy.ohmarking.common.exception;

public class OMRNotFoundException extends RuntimeException {
    public OMRNotFoundException() {super("OMR을 찾을 수 없습니다.");}

    public OMRNotFoundException(String msg) {super(msg);}

    public OMRNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public OMRNotFoundException(Throwable cause) {super(cause);}

    protected OMRNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
