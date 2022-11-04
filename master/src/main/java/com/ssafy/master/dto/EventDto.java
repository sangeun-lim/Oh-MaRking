package com.ssafy.master.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "Event : 이벤트정보", description = "이벤트의 상세정보를 나타낸다")
public class EventDto {
    @ApiModelProperty(value = "이벤트 id")
    private Long id;
    @ApiModelProperty(value = "이벤트 시작일")
    private Instant start_date;
    @ApiModelProperty(value = "이벤트 종료일")
    private Instant end_date;
    @ApiModelProperty(value = "이벤트 링크")
    private String event_link;
    @ApiModelProperty(value = "이미지 저장경로")
    private String img_link;
}
