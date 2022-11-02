package com.ssafy.login.db.entity;

import com.ssafy.login.api.request.UserUpdateDto;
import lombok.*;

import javax.persistence.*;
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
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String link;

    @Column(nullable = false)
    private String introduction;

    public void updateUser(UserUpdateDto userUpdateDto) {
        this.name = userUpdateDto.getName();
        this.email = userUpdateDto.getEmail();
        this.introduction= userUpdateDto.getIntroduction();
    }

}
