package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.entity.Note;
import com.ssafy.ohmarking.repository.NoteRepository;
import com.ssafy.ohmarking.dto.NoteDto;
import com.ssafy.ohmarking.util.DEConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;
    private DEConverter converter;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, DEConverter converter) {
        this.noteRepository = noteRepository;
        this.converter = converter;
    }

    @Override
    public NoteDto insertNote(NoteDto noteDto) throws Exception {
        // 응원글 작성 시간 백엔드에서 처리해주기
//        noteDto.setDate(Instant.now());
        noteRepository.findById(noteDto.getId()).get().setDate(Timestamp.from(Instant.now()));

        // 1) DTO를 Entity로 변경 2) 저장 3) 다시 DTO로 변경(Controller는 DTO 사용)
        return converter.toNoteDto(noteRepository.save(converter.toNoteEntity(noteDto)));
    }

    @Override
    public NoteDto seeNote(NoteDto noteDto) throws Exception {
        String originPwd = noteRepository.findByIdAndPwd(noteDto.getId(), noteDto.getPwd()).getPwd();
        // 기존에 입력한 비밀번호와 현재 입력한 비밀번호가 같다면
        if (originPwd.equals(noteDto.getPwd())) {
            Note note = noteRepository.findByIdAndPwd(noteDto.getId(), noteDto.getPwd());
            // 해당 응원글 반환
            NoteDto returnNoteDto = new NoteDto(note.getNickname(), note.getContent(), note.getShowDate().toInstant(), note.getDate().toInstant(), note.getProblemNum(), note.getCheckNum());
            return returnNoteDto;
        }
        return null;
    }

    @Override
    public NoteDto showNote(Long id) throws Exception {
        return converter.toNoteDto(noteRepository.findAllById(id));
    }

    @Override
    public void updateNote(NoteDto noteDto) throws Exception {
        Note note = noteRepository.getReferenceById(noteDto.getId());
        note.setContent(noteDto.getContent());
        note.setShowDate(Timestamp.from(noteDto.getShowDate()));
        return;
        /**
        // DB 에 저장된 비밀번호가 현재 입력하는 비밀번호와 일치하면 ( 이 로직이 필요없는 이유 : 애초에 비밀번호 검사 하고 노트 보여짐)
        if(note.getPwd() == noteDto.getPwd()) {
            // 수정 본문이 공백이 아니면 본문 수정
            if (noteDto.getContent() != null) note.setContent(noteDto.getContent());
        }
         **/
        /**
        // 공개날짜 변경
        Date beforeDate = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").parse(String.valueOf(noteDto.getShow_date()));
        Date showDate = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").parse(String.valueOf(note.getShow_date().toInstant()));
        if(!beforeDate.equals(showDate)) note.setShow_date(Timestamp.from(noteDto.getShow_date()));
        **/
    }

    @Override
    // @Transactional
    public void deleteNote(Long id) throws Exception {
        noteRepository.delete(noteRepository.getReferenceById(id));
    }

    @Override
    public List<NoteDto> findNote(String nickname) {
        return converter.toNoteDtoList(noteRepository.findByNickname(nickname));
    }

}
