package com.ssafy.master.api.service;


import com.ssafy.master.db.entity.Note;
import com.ssafy.master.db.repository.NoteRepository;
import com.ssafy.master.dto.NoteDto;
import com.ssafy.master.db.repository.OMRRepository;
import com.ssafy.master.util.DEConverter;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private NoteRepository noteRepository;
    private OMRRepository omrRepository;
    private DEConverter converter;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, OMRRepository omrRepository, DEConverter converter) {
        this.noteRepository = noteRepository;
        this.omrRepository = omrRepository;
        this.converter = converter;
    }

    @Override
    public void insertNote(long omrId, String nickname, String content, String pwd, String showDate, int problemNum, int checkNum) throws Exception {
        // testDto 임시 주석
        // noteRepository.findById(noteDto.getId()).get().setDate(Timestamp.from(Instant.now()));

        // 1) DTO를 Entity로 변경 2) 저장 3) 다시 DTO로 변경(Controller는 DTO 사용)
        // return converter.toNoteDto(noteRepository.save(converter.toNoteEntity(noteDto)));

        // 백엔드에서 note 작성 시 시간 저장
        Date now = new Date();
        String date = new SimpleDateFormat("yyyy-MM-dd").format(now);

        NoteDto noteDto = new NoteDto(omrId, nickname, content, pwd, date, showDate, problemNum, checkNum);
        noteRepository.save(converter.toNoteEntity(noteDto));
        return;
    }

    @Override
    public NoteDto seeNote(long id, String pwd) throws Exception {
        String originPwd = noteRepository.findByIdAndPwd(id, pwd).getPwd();
        // 기존에 입력한 비밀번호와 현재 입력한 비밀번호가 같다면
        if (originPwd.equals(pwd)) {
            Note note = noteRepository.findByIdAndPwd(id, pwd);
            // 해당 응원글 반환
            NoteDto returnNoteDto = new NoteDto(note.getNickname(), note.getContent(), note.getDate(), note.getShowDate(), note.getProblemNum(), note.getCheckNum());
            return returnNoteDto;
        }
        return null;
    }

    @Override
    public NoteDto showNote(long id, int isOpen) throws Exception {
        // 1) Note id 에 맞는 note entity 를 불러와서
        Note note = noteRepository.findAllById(id);
        // 2) isOpen 값을 entity 에 저장해준후에
        note.setIsOpen(isOpen);
        // 3) Dto 로 변환해서 리턴해주기
        return converter.toNoteDto(note);

        // return converter.toNoteDto(noteRepository.findAllById(id));
    }

    @Override
    public void updateNote(long id, String nickname, String content, String showDate) throws Exception {
        Note note = noteRepository.getReferenceById(id);
        note.setContent(content);
        note.setShowDate(showDate);
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
    public void deleteNote(long id) throws Exception {
        noteRepository.delete(noteRepository.getReferenceById(id));
    }

    @Override
    public List<NoteDto> findNote(String nickname) {
//        return converter.toNoteDtoList(noteRepository.findByNickname(nickname));

        List<NoteDto> returnNoteDtoLists = new ArrayList<>();
        NoteDto returnNoteDto = new NoteDto();

        // 1) nickname 으로 해당 entity 를 찾아서
        // 1-1) nickname 으로 찾으면 entity list 가 반환되므로
        List<Note> noteList = new ArrayList<>();
        noteList = noteRepository.findByNickname(nickname);
        // 1-2) for 문을 돌면서 하나의 튜플을 꺼내와서 id 를 가져온다
        for (int i=0; i<noteList.size(); i++) {
            long id = noteList.get(i).getId(); // noteId
            int problemNum = noteList.get(i).getProblemNum();
            int checkNum = noteList.get(i).getCheckNum();
            String showDate = noteList.get(i).getShowDate();
            String date = noteList.get(i).getDate();

            // 1-3) 가져온 id 로 omr entity 접근할 때 열쇠로 사용한다
            // 그 entity 에서 omr entity 로 접근해서 페이지번호 가져와야 함 (.findById(id).get().getOmr().getPageNum())
            int pageNum = noteRepository.getReferenceById(id).getOmr().getPageNum();
            returnNoteDto = new NoteDto(id, pageNum, date, showDate, problemNum, checkNum);
            returnNoteDtoLists.add(returnNoteDto);
        }
        return returnNoteDtoLists;
    }

    @Override
    public void bookmarkNote(long id, int isFavorite) {
        // 해당 응원글의 즐겨찾기 여부 DB에 저장하기
        Note note = noteRepository.findAllById(id);
        note.setIsFavorite(isFavorite);
        noteRepository.save(note);
    }

    @Override
    public List<NoteDto> findBookmarkNote(long id, int isFavorite) {
        List<NoteDto> returnNoteDtoLists = new ArrayList<>();
        NoteDto returnNoteDto = new NoteDto();
        // isFavorite 이 1이면 List 에 담아주고
        if(isFavorite==1) {
            int pageNum = noteRepository.findById(id).get().getOmr().getPageNum();
            int problemNum = noteRepository.findAllById(id).getProblemNum();
            int checkNum = noteRepository.findAllById(id).getCheckNum();
            String content = noteRepository.findAllById(id).getContent();
            String nickname = noteRepository.findAllById(id).getNickname();

            for (int i = 0; i<noteRepository.findByIsFavorite(isFavorite).size(); i++) {
                // 아래 코드의 return 형식이 void 라서 set 으로 pageNum 을 설정하고 그 뒤를 모르겠어서 일단 노가다로 하기
                converter.toNoteDtoList(noteRepository.findByIsFavorite(isFavorite)).get(i).setPageNum(pageNum);
                returnNoteDto = new NoteDto(pageNum, nickname, content, problemNum, checkNum);
                returnNoteDtoLists.add(returnNoteDto);
            }
            return returnNoteDtoLists;
//            return converter.toNoteDtoList(noteRepository.findByIsFavorite(isFavorite));
        }
        // 그렇지 않으면 담지 않는다
        return null;
    }

}

