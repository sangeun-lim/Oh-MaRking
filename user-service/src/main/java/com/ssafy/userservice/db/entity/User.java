package com.ssafy.userservice.db.entity;

import com.ssafy.userservice.api.request.UserUpdateDto;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {
    @Id
    @Column(nullable = false)
    private long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String coded_email;

    @Column(nullable = false)
    private String introduction;

    public void updateUser(UserUpdateDto userUpdateDto) {
        this.nickname = userUpdateDto.getNickname();
        this.introduction= userUpdateDto.getIntroduction();
    }

}

