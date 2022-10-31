package com.ssafy.ohmarking.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "OMR")
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OMR {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
    @Column(name = "fkUserId", nullable = false)
    private Long fkUserId;
    **/

    @Column(name = "pageNum", nullable = false)
    private Integer pageNum;

    @Column(nullable = false)
    private Integer color;

    @Builder.Default
    @OneToMany(mappedBy = "omr", cascade = CascadeType.ALL)
    private List<Note> noteList = new ArrayList<>();

}
