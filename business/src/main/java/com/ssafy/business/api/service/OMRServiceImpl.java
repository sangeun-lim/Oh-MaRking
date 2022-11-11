package com.ssafy.business.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.business.api.request.OMRInsertDto;
import com.ssafy.business.api.request.OMRUpdateDto;
import com.ssafy.business.api.response.OMRDto;
import com.ssafy.business.api.response.OMRResponseDto;
import com.ssafy.business.api.response.UserInfoDto;
import com.ssafy.business.api.response.UserOMRInfo;
import com.ssafy.business.common.exception.AccessDeniedException;
import com.ssafy.business.common.exception.NoteCountException;
import com.ssafy.business.common.exception.OMRCountException;
import com.ssafy.business.common.exception.OMRNotFoundException;
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
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class OMRServiceImpl implements  OMRService{
    @Value("${token-server.url}")
    private String base_url;

    private final OMRRepository omrRepository;

    private final NoteRepository noteRepository;
    @Override
    public UserOMRInfo getOMRNumsByUserId(Long user_id) {

        List<OMR> omrList= omrRepository.getAllByUserid(user_id);
        UserOMRInfo userOMRInfo=new UserOMRInfo();
        if(omrList.size()==0){
            OMR omr=OMR.builder().userid(user_id).pageNum(0).color(1).build();
            omrRepository.save(omr);
            omrList= omrRepository.getAllByUserid(user_id);
        }

        for(OMR O:omrList){
            userOMRInfo.omridList.add(O.getId());
            System.out.println(O.getId());
        }





        return userOMRInfo;
    }

    @Override
    public OMRDto getOMRByOMRIdAndToken(String authorization, long omr_id) throws IOException {
        long login_id= getUserId(authorization);
        OMR omr=omrRepository.findAllById(omr_id);
        UserInfoDto userInfoDto=getUserInfo(omr.getUserid());
        OMRResponseDto omrResponseDto=getOMRInfoByOMRId(omr_id);
        boolean isOnwer = false;
        if(login_id==userInfoDto.getId()){
            isOnwer=true;
        }
        OMRDto omrDto=OMRDto.builder().omr(omrResponseDto).isOwner(isOnwer).user(userInfoDto).build();


        return omrDto;
    }

    @Override
    public Long getUserId(String authorization) throws IOException {
        URL url=new URL(base_url+"/info");
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
    public OMRDto getOMRByOMRId(long omr_id) throws IOException {
        OMR omr=omrRepository.findAllById(omr_id);
        UserInfoDto userInfoDto=getUserInfo(omr.getUserid());
        OMRResponseDto omrResponseDto=getOMRInfoByOMRIdNotLogin(omr_id);
        boolean isOnwer = false;
        OMRDto omrDto=OMRDto.builder().omr(omrResponseDto).isOwner(isOnwer).user(userInfoDto).build();
        return omrDto;
    }

    @Override
    public Boolean makeOMRUserJoin(long user_id) {
        OMR omr=OMR.builder().userid(user_id).color(1).pageNum(0).build();
        omrRepository.save(omr);
        return true;
    }

    @Override
    public Map<String, Long> insertOMR(OMRInsertDto omrInsertDto) {
        int omrPage=omrRepository.getOMRCount(omrInsertDto.getUserId());
        if(omrInsertDto.getPageNum() != omrPage){
            throw new OMRCountException();
        }
        int num= noteRepository.getNoteCount(omrInsertDto.getUserId(), omrInsertDto.getPageNum() - 1);
        if (num <= 2) {
            throw new NoteCountException();
        }
        OMR omr=OMR.builder()
                .color(omrInsertDto.getColor())
                .pageNum(omrInsertDto.getPageNum())
                .userid(omrInsertDto.getUserId()).build();
        omrRepository.save(omr);


        return new HashMap<String, Long>() {
            {
                put("omrId", omr.getId());
            }
        };
    }

    @Override
    public void changeColor(String authorization, OMRUpdateDto omrUpdateDto) throws IOException {
        Long id=getUserId(authorization);
        OMR omr = omrRepository.findById(omrUpdateDto.getOmrId()).orElseThrow(OMRNotFoundException::new);

        if (id != omr.getUserid()) {
            throw new AccessDeniedException();
        }
        omr.updateColor(omrUpdateDto.getColor());

    }

    public UserInfoDto getUserInfo(Long user_id) throws IOException {
        URL url=new URL(base_url+"/"+user_id);
        HttpURLConnection connection=(HttpURLConnection)url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-Type","apllication/json; utf-8");
        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(br);
        Long id=Long.parseLong(root.get("data").get("id").toString());
        String name=root.get("data").get("name").toString();
        name=name.substring(1,name.length()-1);
        String codedEmail=root.get("data").get("codedEmail").toString();
        codedEmail=codedEmail.substring(1,codedEmail.length()-1);
        String introduction=root.get("data").get("introduction").toString();
        introduction=introduction.substring(1,introduction.length()-1);
        UserInfoDto userInfoDto=UserInfoDto.builder().id(id).name(name)
                .codedEmail(codedEmail).introduction(introduction).build();


        return userInfoDto;
    }


    public OMRResponseDto getOMRInfoByOMRId(long omr_id) {

        OMR omr=omrRepository.findAllById(omr_id);
        int[][] omrInfo=new int[20][5];
        long[][] noteInfo=new long[20][5];
        List<Note> noteList = omr.getNoteList();
        LocalDate today = LocalDate.now();
        for(Note note:noteList){
            int r=note.getProblemNum();
            int c=note.getCheckNum();
            LocalDate day = LocalDate.parse(note.getShowDate(), DateTimeFormatter.ISO_DATE);
            if(note.getIsFavorite()){
                omrInfo[r][c]=4;
            }else if(note.getIsOpened()){
                omrInfo[r][c]=1;
            }else if (day.isAfter(today)){
                omrInfo[r][c]=3;
            }else{
                omrInfo[r][c]=2;
            }
            noteInfo[r][c]=note.getId();

        }
        OMRResponseDto omrResponseDto=OMRResponseDto.builder()
                .color(omr.getColor())
                .pageNum(omr.getPageNum()).omrInfo(omrInfo).noteInfo(noteInfo)
                .build();

        return omrResponseDto;
    }

    public OMRResponseDto getOMRInfoByOMRIdNotLogin(long omr_id) {

        OMR omr=omrRepository.findAllById(omr_id);
        int[][] omrInfo=new int[20][5];
        long[][] noteInfo=new long[20][5];
        List<Note> noteList = omr.getNoteList();
        LocalDate today = LocalDate.now();
        for(Note note:noteList){
            int r=note.getProblemNum();
            int c=note.getCheckNum();
            LocalDate day = LocalDate.parse(note.getShowDate(), DateTimeFormatter.ISO_DATE);
            if (day.isAfter(today)){
                omrInfo[r][c]=3;
            }else{
                omrInfo[r][c]=1;
            }

            noteInfo[r][c]=note.getId();

        }
        OMRResponseDto omrResponseDto=OMRResponseDto.builder()
                .color(omr.getColor())
                .pageNum(omr.getPageNum()).omrInfo(omrInfo).noteInfo(noteInfo)
                .build();

        return omrResponseDto;
    }
}
