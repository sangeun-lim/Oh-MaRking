package com.ssafy.userservice.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JsonDto {
    private boolean success;
    private int status;
    private String message;
}
