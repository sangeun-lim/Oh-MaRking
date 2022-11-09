package com.ssafy.business.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteInsertDto {
    private Integer checkNum;
    private String content;
    private String nickname;
    private Long omrId;
    private Integer problemNum;
    private String pwd;
    private String showDate;
}
