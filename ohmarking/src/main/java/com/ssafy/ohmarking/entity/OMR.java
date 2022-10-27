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

    @Column(nullable = false)
    private Integer page_num;

    @Builder.Default
    @OneToMany(mappedBy = "omr", cascade = CascadeType.ALL)
    private List<Note> noteList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;
}
