package com.ssafy.ohmarking.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "User : 회원정보", description = "수험생(회원)의 상세정보를 나타낸다.")
public class UserDto implements Serializable {
    @ApiModelProperty(value = "수험생 id")
    private Long id;
    @ApiModelProperty(value = "수험생 이름")
    private String name;
    @ApiModelProperty(value = "수험생 이메일")
    private String email;
    @ApiModelProperty(value = "수험생 OMR 링크")
    private String link;
    @ApiModelProperty(value = "수험생 자기소개")
    private String introduction;
    @ApiModelProperty(value = "수험생이 받은 Note 갯수")
    private Integer total_omr;
}
