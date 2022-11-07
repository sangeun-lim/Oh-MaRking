package com.ssafy.business.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OMRInsertDto {
    private Integer color;
    private Integer pageNum;
    private Long userId;

}
