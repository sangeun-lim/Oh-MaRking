package com.ssafy.ohmarking.service;

import com.ssafy.ohmarking.db.entity.Note;
import com.ssafy.ohmarking.db.repository.NoteRepository;
import com.ssafy.ohmarking.dto.NoteDto;
import com.ssafy.ohmarking.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

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
        return null;
    }

    @Override
    public NoteDto updateNote(NoteDto noteDto) throws Exception {
        Note note = noteRepository.getReferenceById(noteDto.getId());
        if (noteDto.getContent() != null) note.set(boardDto.getBoardContent());
        if (boardDto.getBoardTitle() != null) board.setBoardTitle(boardDto.getBoardTitle());
        board.setBoardUpdate(Instant.now());
        return converter.toBoardDto(board);
    }

    @Override
    @Transactional
    public void deleteNote(Long id, String pwd) throws Exception {
        String notePwd = noteRepository.getReferenceById(id).getPwd();
        // 프론트에서 입력한 비밀번호와 notePwd(처음 지정한 비밀번호)가 일치하면 삭제
        if(notePwd==pwd) {
            noteRepository.delete(noteRepository.getReferenceById(id));
        }
    }
}
