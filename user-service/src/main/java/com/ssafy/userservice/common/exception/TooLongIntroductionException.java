package com.ssafy.userservice.common.exception;

public class TooLongIntroductionException extends IllegalArgumentException{
    public TooLongIntroductionException() {
        super("자기소개가 20자를 초과합니다. 최대 20자 까지 가능합니다");
    }

    public TooLongIntroductionException(String msg) {
        super(msg);
    }

    public TooLongIntroductionException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public TooLongIntroductionException(Throwable cause) {
        super(cause);
    }
}
