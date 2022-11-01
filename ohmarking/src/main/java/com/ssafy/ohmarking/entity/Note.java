package com.ssafy.ohmarking.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Note")
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String pwd;

    @Column(nullable = false)
    private Timestamp date;

    @Column(name="show_date", nullable = false)
    private Timestamp showDate;

    @Column(name="problem_num", nullable = false)
    private Integer problemNum;

    @Column(name="check_num",nullable = false)
    private Integer checkNum;

    @ManyToOne
    @JoinColumn(name = "fkOmrId")
    private OMR omr;
}
