package com.ssafy.userservice.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoByCodedEmailDto {
    private Long userId;
    private List<Integer> omrList;
}
