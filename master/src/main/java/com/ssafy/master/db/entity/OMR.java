package com.ssafy.master.db.entity;


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

    //    @Column(name = "fk_user_id", nullable = false)
//    private Long fkUserId;
    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "page_num", nullable = false)
    private Integer pageNum;

    @Column(nullable = false)
    private Integer color;

    @Builder.Default
    @OneToMany(mappedBy = "omr", cascade = CascadeType.ALL)
    private List<Note> noteList = new ArrayList<>();

}

