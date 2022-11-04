package com.ssafy.master.api.service;


import com.ssafy.master.dto.OMRDto;
import com.ssafy.master.db.entity.Note;
import com.ssafy.master.db.entity.OMR;
import com.ssafy.master.db.repository.NoteRepository;
import com.ssafy.master.db.repository.OMRRepository;
import com.ssafy.master.util.DEConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OMRServiceImpl implements OMRService {
    private OMRRepository omrRepository;
    private NoteRepository noteRepository;
    private DEConverter converter;

    @Autowired
    public OMRServiceImpl(OMRRepository omrRepository, NoteRepository noteRepository, DEConverter converter) {
        this.omrRepository = omrRepository;
        this.noteRepository = noteRepository;
        this.converter = converter;
    }

    @Override
    public OMRDto getOMR(Long id) throws Exception {
        System.out.println("id : "+id);
        // DB에서 OMR 고유 id를 조회하여 해당 id에 맞는 튜플 반환
        OMR omr = omrRepository.findAllById(id);
//        OMR omr = omrRepository.findById(id).orElseThrow();

        /** 상태저장관련 **/
        // OMR id에 맞는 note entity를 불러와서
        List<Note> noteLists = noteRepository.findAllByOmrId(omr.getId());
//        // StatusDto에 저장해주기
//        StatusDto statusDto = new StatusDto();
        // 2차원 배열을 선언해서 저장해주기 (진짜 omrInfo 에 저장전에 임시 저장)
        int[][] saveOmrInfo = new int[20][5];
        // 2차원 배열을 선언해서 저장해주기 (진짜 noteInfo 에 저장전에 임시 저장)
        long[][] saveNoteInfo = new long[20][5];
        // problemNum과 checkNum, date, showDate 날짜를 불러와서 (날짜는 계산하기 위해 형변환 해주기)
        for (int i=0; i<noteLists.size(); i++) {
            int pn = noteLists.get(i).getProblemNum();
            int cn = noteLists.get(i).getCheckNum();
            int d = Integer.parseInt(noteLists.get(i).getDate().replaceAll("-", ""));
            int sd = Integer.parseInt(noteLists.get(i).getShowDate().replaceAll("-", ""));
            int status = 0; // 노트 저장 상태
            int favorite = noteLists.get(i).getIsFavorite();
            long noteId = noteLists.get(i).getId(); // noteInfo 에 저장할 noteId 값
            if(sd-d>0){ // 현재날짜보다 공개날짜가 이후이면 비공개(대기)
                status = 3; // 못읽는거
                saveOmrInfo[pn][cn] = status;
                // 체크된 번호에 해당 노트 id 저장
                saveNoteInfo[pn][cn] = noteId;
            }
            // 현재날짜와 공개날짜가 같거나, 공개날짜가 지났다면 공개(읽기 가능)
            else if(sd-d<=0 && noteLists.get(i).getIsOpen()==0) { // 안읽음
                status = 2;
                saveOmrInfo[pn][cn] = status;
                // 체크된 번호에 해당 노트 id 저장
                saveNoteInfo[pn][cn] = noteId;
            }
            else if(sd-d<=0 && noteLists.get(i).getIsOpen()!=0) { // 읽음
                status = 1;
                saveOmrInfo[pn][cn] = status;
                // 체크된 번호에 해당 노트 id 저장
                saveNoteInfo[pn][cn] = noteId;
            }

            // 즐겨찾기 관련 로직
            if(favorite==1) { // 즐겨찾기 등록이 되어있다면
                status = 4;
                saveOmrInfo[pn][cn] = status;
                // 체크된 번호에 해당 노트 id 저장
                saveNoteInfo[pn][cn] = noteId;
            }

//            else { // 현재날짜와 공개날짜가 같거나, 공개날짜가 지났다면 공개(읽기 가능)
//                if(noteLists.get(i).getIsOpen()==0){ // 안열어봤거나
//                    status = 2;
//                    saveOmrInfo[pn][cn] = status;
//                } else { // 열어봤거나
//                    status = 1;
//                    saveOmrInfo[pn][cn] = status;
//                }
//            }
        }
        // 저장한 2차원 배열을 OMRDto 에 있는 omrInfo 배열에 저장시키기
        OMRDto returnOMRDto = new OMRDto();
        returnOMRDto = converter.toOMRDto(omr);
        returnOMRDto.setOmrInfo(saveOmrInfo);
        returnOMRDto.setNoteInfo(saveNoteInfo);

        // 반환
        return returnOMRDto;

        // 1) Entity를 DTO로 변경 2) 리턴
        // return converter.toOMRDto(omr);
    }

    @Override
    public void addOMR(long userId, int color, int pageNum) throws Exception {
        OMRDto omrDto = new OMRDto(userId, color, pageNum);
        omrRepository.save(converter.toOMREntity(omrDto));
        return;
    }

    @Override
    public void updateColorOMR(long id, int color) throws Exception {
        OMRDto omrDto = new OMRDto(id, color);
        omrRepository.save(converter.toOMREntity(omrDto));
        return;
    }

}

