package com.ssafy.ohmarking.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OMR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer pageNum;

    @Column(nullable = false)
    private Integer color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    private User user;

    @OneToMany(mappedBy = "omr", cascade = CascadeType.ALL)
    private List<Note> noteList = new ArrayList<>();

    public void updateColor(Integer color) {this.color = color;}
    public void updatePageNum(Integer pageNum) {this.pageNum = pageNum;}
}
