package com.ssafy.ohmarking.db.entity;

import com.ssafy.ohmarking.api.request.UserUpdateDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String codedEmail;

    @Column(nullable = false)
    private String introduction;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<OMR> omrList = new ArrayList<>();

    public void updateUser(UserUpdateDto userUpdateDto) {
        this.nickname = userUpdateDto.getNickname();
        this.introduction= userUpdateDto.getIntroduction();
    }

}

