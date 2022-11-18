package com.ssafy.business.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteNoteDto {
    private Long noteId;
    private String nickname;
    private String content;
    private Integer pageNum;
    private Integer problemNum;
    private Integer checkNum;
}
