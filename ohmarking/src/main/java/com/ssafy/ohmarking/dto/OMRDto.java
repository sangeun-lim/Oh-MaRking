package com.ssafy.ohmarking.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "OMR : Note 보드", description = "OMR의 상세정보를 나타낸다")
public class OMRDto {
    @ApiModelProperty(value = "OMR id")
    private Long id;
    @ApiModelProperty(value = "OMR 페이지 수")
    private Integer page_num;
}
