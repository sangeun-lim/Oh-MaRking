package com.ssafy.master.util;


// Dto <-> Entity Converter

import com.ssafy.master.dto.OMRDto;
import com.ssafy.master.db.entity.Note;
import com.ssafy.master.dto.NoteDto;
import com.ssafy.master.db.entity.OMR;
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

    public List<NoteDto> toNoteDtoList(List<Note> list) { return mapList(list, NoteDto.class);  }
}

