package com.ssafy.ohmarking.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OMRRegisterDto {
    private Long userId;
    private Integer color;
    private Integer pageNum;
}
