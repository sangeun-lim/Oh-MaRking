package com.ssafy.business.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteDto {
    private Long noteId;
    private String showDate;
    private String date;
    private Integer pageNum;
    private Integer problemNum;
    private Integer checkNum;
}
