package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.OMRDto;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OMRService {
    OMRDto getOMR(Long id) throws Exception;
    void addOMR(OMRDto omrDto) throws Exception;
    void updateColorOMR(OMRDto omrDto) throws Exception;
}
