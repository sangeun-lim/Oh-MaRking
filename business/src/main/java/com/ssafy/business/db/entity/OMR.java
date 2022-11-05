package com.ssafy.business.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "OMR")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OMR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id",nullable = false)
    private Long userid;

    @Column(name = "page_num",nullable = false)
    private Integer pagenum;

    @Column(nullable = false)
    private Integer color;

    @OneToMany(mappedBy = "omr", cascade = CascadeType.ALL)
    private List<Note> noteList = new ArrayList<>();
}
