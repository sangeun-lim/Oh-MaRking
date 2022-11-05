package com.ssafy.business.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.business.api.response.OMRResponseDto;
import com.ssafy.business.api.response.UserOMRInfo;
import com.ssafy.business.db.entity.Note;
import com.ssafy.business.db.entity.OMR;
import com.ssafy.business.db.repository.NoteRepository;
import com.ssafy.business.db.repository.OMRRepository;
import jdk.nashorn.internal.parser.JSONParser;
import lombok.RequiredArgsConstructor;
import org.codehaus.jackson.map.util.JSONPObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;

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
            OMR omr=OMR.builder().userid(user_id).pagenum(1).color(1).build();
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
    public OMRResponseDto getOMRByOMRIdAndToken(String authorization, long omr_id) throws IOException {
        long login_id= getUserId(authorization);


        return null;
    }

    @Override
    public Long getUserId(String authorization) throws IOException {
        URL url=new URL(base_url+"/user/info");
        HttpURLConnection connection=(HttpURLConnection)url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-Type","apllication/json; utf-8");
        connection.setRequestProperty("Authorization",authorization);
//        System.out.println(connection);
//        System.out.println(connection.getInputStream().toString());
        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(br);
        Long login_id=Long.parseLong(root.get("data").get("id").toString());
//        System.out.println("id :  "+id);



        return login_id;
    }

    @Override
    public OMRResponseDto getOMRByOMRId(long omr_id) {
        OMR omr=omrRepository.findAllById(omr_id);
        int[][] omrInfo=new int[20][5];
        long[][] noteInfo=new long[20][5];
        List<Note> noteList = omr.getNoteList();
        for(Note note:noteList){
            int r=note.getProblemNum();
            int c=note.getCheckNum();
            omrInfo[r][c]=1;
            noteInfo[r][c]=note.getId();

        }
        OMRResponseDto omrResponseDto=OMRResponseDto.builder().id(omr_id)
                .color(omr.getColor()).userId(omr.getUserid()).isOwner(false)
                .pageNum(omr.getPagenum()).omrInfo(omrInfo).noteInfo(noteInfo)
                .build();

        return omrResponseDto;
    }
}
