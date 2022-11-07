package com.ssafy.ohmarking.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OMRInfoResponseDto {
    private Integer color;
    private Integer pageNum;
    private int[][] omrInfo;
    private long[][] noteInfo;
    private String[][] nicknameInfo;
    private String[][] showDateInfo;
}
