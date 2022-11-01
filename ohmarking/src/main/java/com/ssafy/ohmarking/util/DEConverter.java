package com.ssafy.ohmarking.util;

// Dto <-> Entity Converter

import com.ssafy.ohmarking.dto.OMRDto;
import com.ssafy.ohmarking.entity.Note;
import com.ssafy.ohmarking.dto.NoteDto;
import com.ssafy.ohmarking.entity.OMR;
import org.modelmapper.Conditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DEConverter {
    private ModelMapper modelMapper;
    @Autowired
    DEConverter(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        this.modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        this.modelMapper.getConfiguration().setAmbiguityIgnored(true);
    }

    private <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source
                .stream()
                .map(element -> modelMapper.map(element, targetClass))
                .collect(Collectors.toList());
    }

    /** Note 관련 **/
    public NoteDto toNoteDto(Note note) { return modelMapper.map(note, NoteDto.class); }

    public Note toNoteEntity(NoteDto noteDto) { return modelMapper.map(noteDto, Note.class); }

    /** OMR 관련 **/
    public OMRDto toOMRDto(OMR omr) { return modelMapper.map(omr, OMRDto.class);}
    public OMR toOMREntity(OMRDto omrDto) { return modelMapper.map(omrDto, OMR.class); }
//    public List<OMR> toOMRDto(List<OMR> omrList){ return mapList(omrList, OMRDto.class); }

}
