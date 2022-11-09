package com.ssafy.business.common.exception;

public class NoteNotFoundException extends RuntimeException {
    public NoteNotFoundException() {super("응원 메시지를 찾을 수 없습니다.");}

    public NoteNotFoundException(String msg) {super(msg);}

    public NoteNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public NoteNotFoundException(Throwable cause) {super(cause);}

    protected NoteNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
