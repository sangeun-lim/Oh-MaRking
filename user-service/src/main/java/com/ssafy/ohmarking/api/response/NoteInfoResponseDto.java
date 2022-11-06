package com.ssafy.ohmarking.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NoteInfoResponseDto {
    private Long noteId;
    private String nickname;
    private String content;
    private String showDate;
    private String date;
    private Integer pageNum;
    private Integer problemNum;
    private Integer checkNum;
    private Boolean isFavorite;
}
