package com.ssafy.ohmarking.db.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.DateTimeException;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
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

    @Column(nullable = false)
    private Timestamp show_date;

    @Column(nullable = false)
    private Integer problem_num;

    @Column(nullable = false)
    private Integer check_num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_omr_id")
    private OMR omr;
}
