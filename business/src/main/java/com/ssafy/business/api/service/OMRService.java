package com.ssafy.business.api.service;

import com.ssafy.business.api.response.OMRResponseDto;
import com.ssafy.business.api.response.UserOMRInfo;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface OMRService {

    UserOMRInfo getOMRNumsByUserId(Long user_id);

    OMRResponseDto getOMRByOMRIdAndToken(String authorization, long omr_id) throws IOException;
    public Long getUserId(String authorization) throws IOException;

    OMRResponseDto getOMRByOMRId(long omr_id);
}
