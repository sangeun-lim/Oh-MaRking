package com.ssafy.ohmarking.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "Note : 응원메시지", description = "응원메시지의 상세정보를 나타낸다.")
public class NoteDto implements Serializable {
    @ApiModelProperty(value = "응원글 id")
    private long id;
    @ApiModelProperty(value = "응원글 작성자")
    private String nickname;
    @ApiModelProperty(value = "응원글 내용")
    private String content;
    @ApiModelProperty(value = "응원글 비밀번호")
    private String pwd;
    @ApiModelProperty(value = "응원글 작성날짜")
    private Instant date;
    @ApiModelProperty(value = "응원글 공개 지정 날짜")
    private Instant show_date;
    @ApiModelProperty(value = "해당 응원글 문항번호")
    private int problem_num;
    @ApiModelProperty(value = "해당 응원글 체크번호")
    private int check_num;

}
