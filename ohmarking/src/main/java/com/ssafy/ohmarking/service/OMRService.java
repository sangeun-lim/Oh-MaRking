package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.OMRDto;
import org.springframework.stereotype.Service;

@Service
public interface OMRService {
    OMRDto getOMR(Long id) throws Exception;
    void addOMR(long userId, int color, int pageNum) throws Exception;
    void updateColorOMR(long id, int color) throws Exception;
}
