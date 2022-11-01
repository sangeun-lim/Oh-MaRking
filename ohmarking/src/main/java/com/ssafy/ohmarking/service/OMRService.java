package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.OMRDto;
import org.springframework.stereotype.Service;

@Service
public interface OMRService {
    OMRDto getOMR(Long id) throws Exception;
    void addOMR(OMRDto omrDto) throws Exception;
    void updateColorOMR(OMRDto omrDto) throws Exception;
}
