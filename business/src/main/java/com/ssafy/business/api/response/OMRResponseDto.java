package com.ssafy.business.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OMRResponseDto {

    private int pageNum;
    private int color;

    private int[][] omrInfo = new int[20][5];
    private long[][] noteInfo = new long[20][5]; // 배열 인덱스와 번호 순서 맞추지 말래 (프론트피셜)


}
