package com.ssafy.business.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteGetResponseDto {
    private String nickname;
    private String content;
    private String showDate;
    private String date;
    private Integer problemNum;
    private Integer checkNum;
    private Boolean isFavarite;
}

