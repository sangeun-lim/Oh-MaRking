package com.ssafy.business.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOMRInfo {
    public List<Long> omridList = new ArrayList<>();

}
