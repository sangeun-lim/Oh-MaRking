package com.ssafy.business.api.service;

import com.ssafy.business.api.request.OMRInsertDto;
import com.ssafy.business.api.request.OMRUpdateDto;
import com.ssafy.business.api.response.FavoriteNoteDto;
import com.ssafy.business.api.response.OMRDto;
import com.ssafy.business.api.response.UserOMRInfo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public interface OMRService {

    UserOMRInfo getOMRNumsByUserId(Long user_id);

    OMRDto getOMRByOMRIdAndToken(String authorization, long omr_id) throws IOException;
    public Long getUserId(String authorization) throws IOException;

    OMRDto getOMRByOMRId(long omr_id) throws IOException;

    Boolean makeOMRUserJoin(long user_id);

    Map<String, Long> insertOMR(OMRInsertDto omrInsertDto);

    void changeColor(String authorization, OMRUpdateDto omrUpdateDto) throws IOException;

    List<FavoriteNoteDto> getFavorites(Long omrId);
}
