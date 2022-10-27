package com.ssafy.ohmarking.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Event")
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private Timestamp start_date;

    @Column(nullable = true)
    private Timestamp end_date;

    @Column(nullable = false)
    private String event_link;

    @Column(nullable = false)
    private String img_link;
}
