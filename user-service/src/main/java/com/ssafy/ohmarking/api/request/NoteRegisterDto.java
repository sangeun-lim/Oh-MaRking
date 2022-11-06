package com.ssafy.ohmarking.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteRegisterDto {
    private Long omrId;
    private String nickname;
    private String content;
    private String pwd;
    private String showDate;
    private Integer problemNum;
    private Integer checkNum;
}
