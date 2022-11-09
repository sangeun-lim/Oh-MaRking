package com.ssafy.business.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteUpdateDto {
    private Long noteId;
    private String content;
    private String showDate;
}
