package com.ssafy.ohmarking.api.service;

import com.ssafy.ohmarking.api.request.OMRRegisterDto;
import com.ssafy.ohmarking.api.request.OMRUpdateDto;
import com.ssafy.ohmarking.api.response.CardInfoResponseDto;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface OMRService {
    CardInfoResponseDto getCardInfo(String accessToken, Long omr_id);
    CardInfoResponseDto getCardInfo(Long omr_id);
    Map<String, Long> registerOMR(OMRRegisterDto omrRegisterDto);
    void changeColor(String accessToken, OMRUpdateDto omrUpdateDto);
}
