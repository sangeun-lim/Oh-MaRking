package com.ssafy.master.common.model;


import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JsonDto {
    private boolean success;
    private int status;
    private String message;
}
