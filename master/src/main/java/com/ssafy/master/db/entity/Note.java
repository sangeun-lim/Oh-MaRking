package com.ssafy.master.db.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;


@EntityScan
@Entity(name = "Note")
@Table(name = "Note")
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@DynamicInsert
@Builder
public class Note {

    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String pwd;

    // @Column(nullable = false)
    @Column
    // private Timestamp date;
    private String date;

    // @Column(name="show_date", nullable = false)
    @Column(name="show_date")
    private String showDate;
    // private Timestamp showDate;
    // private Instant showDate;

    @Column(name="problem_num", nullable = false)
    private Integer problemNum;

    @Column(name="check_num",nullable = false)
    private Integer checkNum;

    //    @Column(name="note_status")
//    private Integer noteStatus;
    // 0이면 미개봉, 1이면 개봉
    @Column
    private Integer isOpen;

    // 즐겨찾기 여부 (0이면 즐겨찾기 해제(default), 1이면 즐겨찾기 등록)
    @Column
    private Integer isFavorite;

    @ManyToOne
    @JoinColumn(name = "fk_omr_Id")
    private OMR omr;
}

