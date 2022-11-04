package com.ssafy.master.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Data
// @Getter @Setter
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

    // 체크번호별 노트 상태 저장
    @ApiModelProperty(value = "OMR 정보") //[문항번호][체크번호]
//    private int[][] omrInfo = new int[21][6]; // 배열인덱스랑 번호(1번부터시작)를 맞추기 위함
    private int[][] omrInfo = new int[20][5]; // 배열 인덱스와 번호 순서 맞추지 말래 (프론트피셜)
    // 체크번호별 노트 id 저장
    @ApiModelProperty(value = "note 정보") //[문항번호][체크번호]
//    private long[][] noteInfo = new long[21][6]; // 배열인덱스랑 번호(1번부터시작)를 맞추기 위함
    private long[][] noteInfo = new long[20][5]; // 배열 인덱스와 번호 순서 맞추지 말래 (프론트피셜)
//    @ApiModelProperty(value = "note 정보")
//    private int omrStatus;

    @ApiModelProperty(value = "OMR 소유여부")
    private boolean isOwner;

    // OMR 읽기 회원 반환 DTO
    public OMRDto(int color, int pageNum, int[][] omrInfo, long[][] noteInfo, boolean isOwner) {
        this.pageNum = pageNum;
        this.color = color;
        this.omrInfo = omrInfo;
        this.noteInfo = noteInfo;
        this.isOwner = isOwner;
    }

//    // OMR 읽기 비회원 반환 DTO
//    public OMRDto(int color, int pageNum, int[][] omrInfo, int[][] noteInfo) {
//        this.pageNum = pageNum;
//        this.color = color;
//        this.omrInfo = omrInfo;
//        this.noteInfo = noteInfo;
//    }

    // OMR 등록 요청 DTO
    public OMRDto(long userId, int color, int pageNum) {
        this.userId = userId;
        this.pageNum = pageNum;
        this.color = color;
    }

    // OMR 수정 요청 DTO
    public OMRDto(long id, int color) {
        this.id = id;
        this.color = color;
    }
}

