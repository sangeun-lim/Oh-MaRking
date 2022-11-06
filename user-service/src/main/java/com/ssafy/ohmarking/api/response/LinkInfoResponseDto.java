package com.ssafy.ohmarking.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LinkInfoResponseDto {
    private Long userId;
    private List<Long> omrList;
}
