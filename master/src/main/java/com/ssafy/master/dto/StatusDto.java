package com.ssafy.master.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
// @Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "상태관련 반환 DTO", description = "omrInfo, noteInfo 에 관련된 상태를 반환할때 사용한다.")
public class StatusDto {
    // 값이 상태
    @ApiModelProperty(value = "OMR 정보")
    private int[][] omrInfo = new int[21][6]; // 배열인덱스랑 번호(1번부터시작)를 맞추기 위함

    // 값이 note_id
    @ApiModelProperty(value = "note 정보") //[문항번호][체크번호]
    private int[][] noteInfo = new int[21][6]; // 배열인덱스랑 번호(1번부터시작)를 맞추기 위함

}

