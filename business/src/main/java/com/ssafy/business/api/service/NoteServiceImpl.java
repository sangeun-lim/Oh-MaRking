package com.ssafy.business.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.business.api.request.NoteCheckDto;
import com.ssafy.business.api.request.NoteInsertDto;
import com.ssafy.business.api.request.NoteUpdateDto;
import com.ssafy.business.api.response.NoteCheckResponseDto;
import com.ssafy.business.api.response.NoteGetResponseDto;
import com.ssafy.business.api.response.UserOMRInfo;
import com.ssafy.business.common.exception.*;
import com.ssafy.business.db.entity.Note;
import com.ssafy.business.db.entity.OMR;
import com.ssafy.business.db.repository.NoteRepository;
import com.ssafy.business.db.repository.OMRRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class NoteServiceImpl implements NoteService{

    private final OMRRepository omrRepository;
    private final NoteRepository noteRepository;
    @Value("${token-server.url}")
    private String base_url;
    @Override
    public Map<String, Long> insertNote(NoteInsertDto noteInsertDto) {
        OMR omr = omrRepository.findById(noteInsertDto.getOmrId()).orElseThrow(OMRNotFoundException::new);
        Integer checkNum = noteInsertDto.getCheckNum();
        Integer problemNum =noteInsertDto.getProblemNum();
        if (checkNum < 0 || checkNum >= 5 || problemNum < 0 || problemNum >= 20) {
            throw new NoteNumberException();
        }
        Optional<Note> temp = noteRepository.findByOMRAndCheckNumAndProblemNum(omr.getId(), noteInsertDto.getCheckNum(),noteInsertDto.getProblemNum() );
        System.out.println(temp.toString());
        if(temp.isPresent()){
            throw new SameNoteException();
        }
        Note note = Note.builder()
                .nickname(noteInsertDto.getNickname())
                .content(noteInsertDto.getContent())
                .pwd(noteInsertDto.getPwd())
                .date(LocalDate.now().toString())
                .showDate(noteInsertDto.getShowDate())
                .problemNum(noteInsertDto.getProblemNum())
                .checkNum(noteInsertDto.getCheckNum())
                .omr(omr).build();
        noteRepository.save(note);
        return new HashMap<String, Long>() {
            {
                put("noteId", note.getId());
            }
        };
    }

    @Override
    @Transactional(readOnly = true)
    public NoteCheckResponseDto checkPwd(NoteCheckDto noteCheckDto) {
        Note note = noteRepository.findById(noteCheckDto.getNoteId()).orElseThrow(NoteNotFoundException::new);
        if(!note.getPwd().equals(noteCheckDto.getPwd())){
            throw new AccessDeniedException();
        }
        NoteCheckResponseDto noteCheckResponseDto=NoteCheckResponseDto.builder()
                .nickname(note.getNickname())
                .content(note.getContent())
                .showDate(note.getShowDate())
                .date(note.getDate())
                .problemNum(note.getProblemNum())
                .checkNum(note.getCheckNum()).build();
        return noteCheckResponseDto;
    }

    @Override
    public void updateNote(NoteUpdateDto noteUpdateDto) {
        Note note = noteRepository.findById(noteUpdateDto.getNoteId()).orElseThrow(NoteNotFoundException::new);
        note.updateNote(noteUpdateDto);
    }

    @Override
    public NoteGetResponseDto readNote(String authorization,Long noteId) throws IOException {
        Note note = noteRepository.findById(noteId).orElseThrow(NoteNotFoundException::new);
        Long uid= getUserId(authorization);
        if(uid != note.getOmr().getUserid()){
            throw  new AccessDeniedException();
        }
        note.updateIsOpened(true);
        NoteGetResponseDto noteGetResponseDto=NoteGetResponseDto.builder()
                .nickname(note.getNickname())
                .content(note.getContent())
                .showDate(note.getShowDate())
                .date(note.getDate())
                .problemNum(note.getProblemNum())
                .checkNum(note.getCheckNum())
                .isFavarite(note.getIsFavorite()).build();


        return noteGetResponseDto;
    }

    @Override
    public Long getUserId(String authorization) throws IOException {
        URL url=new URL(base_url+"/user/info");
        HttpURLConnection connection=(HttpURLConnection)url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-Type","apllication/json; utf-8");
        connection.setRequestProperty("Authorization",authorization);
        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(br);
        Long login_id=Long.parseLong(root.get("data").get("id").toString());



        return login_id;
    }

    @Override
    public UserOMRInfo deleteNote(Long noteId) {

        Note note = noteRepository.findById(noteId).orElseThrow(NoteNotFoundException::new);
        Long userId = note.getOmr().getUserid();
        Long omrId = note.getOmr().getId();
        int pageNum = note.getOmr().getPageNum();
        noteRepository.deleteById(noteId);
        List<OMR> omrList = omrRepository.getAllByUserid(userId);
        if(noteRepository.getNoteCount(omrId)==0){
            for (int i = pageNum + 1; i < omrList.size(); i++) {
                OMR omr = omrRepository.findById(omrList.get(i).getId()).orElseThrow(OMRNotFoundException::new);
                omr.updatePageNum(omr.getPageNum() - 1);
            }
            omrRepository.deleteById(omrId);
            omrList = omrRepository.getAllByUserid(userId);
        }



        List<Long> omridList =new ArrayList<Long>();
        for(OMR omr:omrList){
            omridList.add(omr.getId());
        }

        UserOMRInfo userOMRInfo=UserOMRInfo.builder().omridList(omridList).build();
        return userOMRInfo;
    }
}
