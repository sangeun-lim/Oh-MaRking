package com.ssafy.business.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "Note")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@DynamicInsert
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
    private Date date;

    @Column(name="show_date", nullable = false)
     private Date showDate;

    @Column(name="problem_num", nullable = false)
    private Integer problemNum;

    @Column(name="check_num",nullable = false)
    private Integer checkNum;

    @Column
    private boolean isOpen;

    @Column
    private boolean isFavorite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_omr_id")
    private OMR omr;

}
