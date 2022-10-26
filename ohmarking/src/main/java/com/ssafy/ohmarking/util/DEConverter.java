package com.ssafy.ohmarking.util;

// Dto <-> Entity Converter

import com.ssafy.ohmarking.db.entity.Note;
import com.ssafy.ohmarking.dto.NoteDto;
import org.modelmapper.Conditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

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

    public NoteDto toNoteDto(Note note) {
        return modelMapper.map(note, NoteDto.class);
    }

    public Note toNoteEntity(NoteDto noteDto) {
        return modelMapper.map(noteDto, Note.class);
    }
}
