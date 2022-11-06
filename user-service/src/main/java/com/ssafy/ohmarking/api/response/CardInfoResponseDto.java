package com.ssafy.ohmarking.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardInfoResponseDto {
    private UserInfoResponseDto user;
    private Boolean isOwner;
    private OMRInfoResponseDto omr;
}
