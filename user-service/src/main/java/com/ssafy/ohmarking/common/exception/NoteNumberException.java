package com.ssafy.ohmarking.common.exception;

public class NoteNumberException extends RuntimeException {
    public NoteNumberException() {super("문항 번호 또는 체크 번호가 잘못되었습니다.");}

    public NoteNumberException(String msg) {super(msg);}

    public NoteNumberException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public NoteNumberException(Throwable cause) {super(cause);}

    protected NoteNumberException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
