package com.ssafy.ohmarking.common.exception;

public class NotFindQuestionException extends RuntimeException{
    public NotFindQuestionException() {
        super("질문의 id에 해당하는 질문을 찾지 못했습니다.");
    }

    public NotFindQuestionException(String message) {
        super(message);
    }

    public NotFindQuestionException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFindQuestionException(Throwable cause) {
        super(cause);
    }

    protected NotFindQuestionException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
