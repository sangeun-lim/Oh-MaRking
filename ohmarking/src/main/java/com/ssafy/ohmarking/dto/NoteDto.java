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
    @ApiModelProperty(value = "OMR id (fk)")
    private long fkOmrId;
    @ApiModelProperty(value = "해당 응원글 페이지번호")
    private int pageNum;

    @ApiModelProperty(value = "note 정보") //[문항번호][체크번호] = note 상태(0:없음 ~ 4:즐겨찾기)
    private int[][] noteInfo = new int[21][6]; // 배열 인덱스와 번호 순서 맞춤
//    @ApiModelProperty(value = "note 정보")
//    private int noteStatus;
    @ApiModelProperty(value = "응원글 열람여부")
    private int isOpen;
    @ApiModelProperty(value = "응원글 즐겨찾기여부")
    private int isFavorite;

    @ApiModelProperty(value = "응원글 작성자")
    private String nickname;
    @ApiModelProperty(value = "응원글 내용")
    private String content;
    @ApiModelProperty(value = "응원글 비밀번호")
    private String pwd;
    @ApiModelProperty(value = "응원글 작성날짜")
    private String date;
    // private Instant date;
    @ApiModelProperty(value = "응원글 공개 지정 날짜")
    private String showDate;
    // private Instant showDate;
    @ApiModelProperty(value = "해당 응원글 문항번호")
    private int problemNum;
    @ApiModelProperty(value = "해당 응원글 체크번호")
    private int checkNum;

    // NOTE 등록 요청 DTO + 시간 저장
    public NoteDto(long fkOmrId, String nickname, String content, String pwd, String date, String showDate, int problemNum, int checkNum) {
        this.fkOmrId = fkOmrId;
        this.nickname = nickname;
        this.content = content;
        this.pwd = pwd;
        this.date = date;
        this.showDate = showDate;
        this.problemNum = problemNum;
        this.checkNum = checkNum;
    }

//    // NOTE 보기 (작성자 비밀번호 확인) 요청 DTO
//    public NoteDto(long id, String pwd) {
//        this.id = id;
//        this.pwd = pwd;
//    }

    // NOTE 보기 (작성자 비밀번호 확인) 반환 DTO, NOTE 보기 (수험생) 반환 DTO
    public NoteDto(String nickname, String content, String date, String showDate, int problemNum, int checkNum) {
        this.nickname = nickname;
        this.content = content;
        this.date = date;
        this.showDate = showDate;
        this.problemNum = problemNum;
        this.checkNum = checkNum;
    }

    // NOTE 검색 반환 DTO
    public NoteDto(long id, int pageNum, String date, String showDate, int problemNum, int checkNum) {
        this.id = id;
        this.pageNum = pageNum;
        this.date = date;
        this.showDate = showDate;
        this.problemNum = problemNum;
        this.checkNum = checkNum;
    }

    // 즐겨찾기 NOTE 검색 반환 DTO
    public NoteDto(int pageNum, String nickname, String content, int problemNum, int checkNum) {
        this.pageNum = pageNum;
        this.nickname = nickname;
        this.content = content;
        this.problemNum = problemNum;
        this.checkNum = checkNum;
    }

    // pageNum 갱신용 DTO
    public NoteDto(int pageNum) {
        this.pageNum = pageNum;
    }
}
