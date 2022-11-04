package com.ssafy.master.db.entity;

import com.ssafy.master.api.request.UserUpdateDto;
import lombok.*;

import javax.persistence.*;
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

    public void updateUser(UserUpdateDto userUpdateDto) {
        this.nickname = userUpdateDto.getNickname();
        this.introduction= userUpdateDto.getIntroduction();
    }

}
