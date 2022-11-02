package com.ssafy.ohmarking.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;

@Entity
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

    @ManyToOne
    @JoinColumn(name = "fk_omr_Id")
    private OMR omr;
}
