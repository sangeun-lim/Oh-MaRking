package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.dto.OMRDto;
import com.ssafy.ohmarking.entity.OMR;
import com.ssafy.ohmarking.repository.OMRRepository;
import com.ssafy.ohmarking.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OMRServiceImpl implements OMRService {
    private OMRRepository omrRepository;
    private DEConverter converter;

    @Autowired
    public OMRServiceImpl(OMRRepository omrRepository, DEConverter converter) {
        this.omrRepository = omrRepository;
        this.converter = converter;
    }

    @Override
    public OMRDto getOMR(Long id) throws Exception {
        // DB에서 OMR 고유 id를 조회하여 해당 id에 맞는 튜플 반환
        OMR omr = omrRepository.findAll(id);
        // 1) Entity를 DTO로 변경 2) 리턴
        return converter.toOMRDto(omr);
    }

    @Override
    public void addOMR(OMRDto omrDto) throws Exception {
        omrRepository.save(converter.toOMREntity(omrDto));
        return;
    }

    @Override
    public void updateColorOMR(OMRDto omrDto) throws Exception {
        omrRepository.save(converter.toOMREntity(omrDto));
        return;
    }

}
