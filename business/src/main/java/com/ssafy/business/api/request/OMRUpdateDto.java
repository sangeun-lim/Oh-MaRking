package com.ssafy.business.api.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OMRUpdateDto {
    private Long omrId;
    private Integer color;
}

