package com.ssafy.ohmarking.common.exception;

public class OMRCountException extends RuntimeException {
    public OMRCountException() {super("페이지 번호가 올바르지 않습니다.");}

    public OMRCountException(String msg) {super(msg);}

    public OMRCountException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public OMRCountException(Throwable cause) {super(cause);}

    protected OMRCountException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
