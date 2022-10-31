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
    private long id;
    @ApiModelProperty(value = "OMR 소유자 id")
    private long userId;
    @ApiModelProperty(value = "OMR 페이지 수")
    private int pageNum;
    @ApiModelProperty(value = "OMR 테마색")
    private int color;

    // OMR 등록 반환 DTO
    public OMRDto(long userId, int pageNum, int color) {
        this.userId = userId;
        this.pageNum = pageNum;
        this.color = color;
    }

    // OMR 수정 반환 DTO
    public OMRDto(int pageNum, int color) {
        this.pageNum = pageNum;
        this.color = color;
    }
}
