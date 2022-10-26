package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.db.entity.Note;
import com.ssafy.ohmarking.db.repository.NoteRepository;
import com.ssafy.ohmarking.dto.NoteDto;
import com.ssafy.ohmarking.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class NoteServiceImpl implements NoteService{

    private NoteRepository noteRepository;
    private DEConverter converter;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, DEConverter converter) {
        this.noteRepository = noteRepository;
        this.converter = converter;
    }

    @Override
    public NoteDto insertNote(NoteDto noteDto) throws Exception {
        noteDto.setDate(Instant.now());
        // 1) DTO를 Entity로 변경 2) 저장 3) 다시 DTO로 변경(Controller는 DTO 사용)
        return converter.toNoteDto(noteRepository.save(converter.toNoteEntity(noteDto)));
    }

    @Override
    public NoteDto updateNote(NoteDto noteDto) throws Exception {
        Note note = noteRepository.getReferenceById(noteDto.getId());
        // 수정 본문이 공백이 아니면 본문 수정
        if (noteDto.getContent() != null) note.setContent(noteDto.getContent());
        // 공개날짜 변경
        Date beforeDate = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").parse(String.valueOf(noteDto.getShow_date()));
        Date showDate = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").parse(String.valueOf(note.getShow_date().toInstant()));
        if(!beforeDate.equals(showDate)) note.setShow_date(Timestamp.from(noteDto.getShow_date()));

        return converter.toNoteDto(note);
    }

    @Override
    @Transactional
    public void deleteNote(Long id, String inputPwd) throws Exception {
        String notePwd = noteRepository.getReferenceById(id).getPwd();
        // 프론트에서 입력한 비밀번호와 notePwd(처음 지정한 비밀번호)가 일치하면 삭제
        if(notePwd==inputPwd) {
            noteRepository.delete(noteRepository.getReferenceById(id));
        }
    }
}
