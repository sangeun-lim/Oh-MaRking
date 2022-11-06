package com.ssafy.ohmarking.db.entity;

import com.ssafy.ohmarking.api.request.NoteUpdateDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;

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

//    @CreationTimestamp
//    @Column(nullable = false, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
//    private Timestamp date;
    @Column(nullable = false)
    private String date;

//    @Column(nullable = false)
//    private Timestamp show_date;
    @Column(nullable = false)
    private String showDate;

    @Column(nullable = false)
    private Integer problemNum;

    @Column(nullable = false)
    private Integer checkNum;

    @Column(nullable = false)
    private Boolean isFavorite;

    @Column(nullable = false)
    private Boolean isOpened;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_omr_id")
    private OMR omr;

    public void updateIsFavorite(Boolean isFavorite) {this.isFavorite = isFavorite;}
    public void updateIsOpened(Boolean isOpened) {this.isOpened = isOpened;}
    public void updateNote(NoteUpdateDto noteUpdateDto) {
        this.content = noteUpdateDto.getContent();
        this.showDate = noteUpdateDto.getShowDate();
        this.date = LocalDate.now().toString();
    }

    @PrePersist
    public void prePersist() {
        this.isFavorite = this.isFavorite == null ? false : this.isFavorite;
        this.isOpened = this.isOpened == null ? false : this.isOpened;
    }
}
