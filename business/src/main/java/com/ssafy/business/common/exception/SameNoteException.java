package com.ssafy.business.common.exception;

public class SameNoteException extends RuntimeException {
    public SameNoteException() {super("이미 등록된 체크번호, 문제번호 입니다");}

    public SameNoteException(String msg) {super(msg);}

    public SameNoteException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public SameNoteException(Throwable cause) {super(cause);}

    protected SameNoteException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
