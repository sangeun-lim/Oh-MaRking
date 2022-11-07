package com.ssafy.business.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OMRDto {
    private UserInfoDto user;
    private Boolean isOwner;
    private OMRResponseDto omr;
}
