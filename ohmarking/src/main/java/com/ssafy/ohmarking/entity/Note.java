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

    @Column(nullable = false)
    private Timestamp show_date;

    @Column(nullable = false)
    private Integer problem_num;

    @Column(nullable = false)
    private Integer check_num;

    @ManyToOne
    @JoinColumn(name = "fk_omr_id")
    private OMR omr;
}
