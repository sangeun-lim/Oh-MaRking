package com.ssafy.business.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteFavoriteDto {
    private Boolean isFavorite;
    private Long noteId;
}
