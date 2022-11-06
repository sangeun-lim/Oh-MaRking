package com.ssafy.ohmarking.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckNoteDto {
    private Long noteId;
    private String pwd;
}
