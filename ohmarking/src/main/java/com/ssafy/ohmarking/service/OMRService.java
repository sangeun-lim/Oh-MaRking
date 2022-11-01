package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.OMRDto;

public interface OMRService {
    OMRDto getOMR(Long id) throws Exception;
    void addOMR(OMRDto omrDto) throws Exception;
    void updateColorOMR(OMRDto omrDto) throws Exception;
}
