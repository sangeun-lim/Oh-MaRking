package com.ssafy.ohmarking.api.service;

import com.ssafy.ohmarking.api.request.OMRRegisterDto;
import com.ssafy.ohmarking.api.request.OMRUpdateDto;
import com.ssafy.ohmarking.api.response.CardInfoResponseDto;
import com.ssafy.ohmarking.api.response.OMRInfoResponseDto;
import com.ssafy.ohmarking.api.response.UserInfoResponseDto;
import com.ssafy.ohmarking.common.exception.*;
import com.ssafy.ohmarking.common.util.TokenProvider;
import com.ssafy.ohmarking.db.entity.Note;
import com.ssafy.ohmarking.db.entity.OMR;
import com.ssafy.ohmarking.db.entity.User;
import com.ssafy.ohmarking.db.repository.NoteRepository;
import com.ssafy.ohmarking.db.repository.OMRRepository;
import com.ssafy.ohmarking.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class OMRServiceImpl implements OMRService {
    private final OMRRepository omrRepository;
    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final TokenProvider tokenProvider;
    @Override
    public Map<String, Long> registerOMR(OMRRegisterDto omrRegisterDto) {
        User user = userRepository.findById(omrRegisterDto.getUserId()).orElseThrow(UserNotFoundException::new);
        if (omrRegisterDto.getPageNum() != omrRepository.getOMRCount(user.getId())) {
            throw new OMRCountException();
        }
        int num = noteRepository.getNoteCount(user.getId(), omrRegisterDto.getPageNum() - 1);
        // 테스트 용으로 일단 3개 이상이면 생성할 수 있게 해놓음
        if (num <= 2) {
            throw new NoteCountException();
        }
        OMR omr = OMR.builder()
                .color(omrRegisterDto.getColor())
                .pageNum(omrRegisterDto.getPageNum())
                .user(user)
                .build();
        omrRepository.save(omr);
        return new HashMap<String, Long>() {
            {
                put("omrId", omr.getId());
            }
        };
    }

    @Override
    public void changeColor(String accessToken, OMRUpdateDto omrUpdateDto) {
        String uid = tokenProvider.getUserId(accessToken);
        OMR omr = omrRepository.findById(omrUpdateDto.getOmrId()).orElseThrow(OMRNotFoundException::new);

        if (Long.parseLong(uid) != omr.getUser().getId()) {
            throw new AccessDeniedException();
        }
        omr.updateColor(omrUpdateDto.getColor());
    }

    @Override
    @Transactional(readOnly = true)
    public CardInfoResponseDto getCardInfo(String accessToken, Long omrId) {
        String uid = tokenProvider.getUserId(accessToken);
        OMR omr = omrRepository.findById(omrId).orElseThrow(OMRNotFoundException::new);

        User user = userRepository.findById(omr.getUser().getId()).orElseThrow(() -> new UserNotFoundException("수험생 정보가 올바르지 않습니다."));
        if (Long.parseLong(uid) != omr.getUser().getId()) {
            return getCardInfo(omrId);
        }

        List<Note> list = omr.getNoteList();
        int[][] omrInfo = new int[20][5];
        long[][] noteInfo = new long[20][5];
        String[][] nicknameInfo = new String[20][5];
        String[][] showDateInfo = new String[20][5];

        LocalDate today = LocalDate.now();
        // 0: 없을 때
        // 1: 본 거(날짜 지났고, 칼럼 추가 isOpened = true)
        // 2: 안 읽은 거(날짜 지났고, isOpened = false)
        // 3: 못 읽는 거(날짜 안 지난 거)
        for (int i = 0; i < list.size(); i++) {
            Note note = list.get(i);
            int r = note.getProblemNum();
            int c = note.getCheckNum();
            LocalDate day = LocalDate.parse(note.getShowDate(), DateTimeFormatter.ISO_DATE);
            if(note.getIsFavorite()){
                omrInfo[r][c] = 4;
            }else if (day.isAfter(today)) {
                omrInfo[r][c] = 3;
            } else {
                omrInfo[r][c] = note.getIsOpened() ? 1 : 2;
            }
            noteInfo[r][c] = note.getId();
            nicknameInfo[r][c] = note.getNickname();
            showDateInfo[r][c] = note.getShowDate();
        }

        UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.builder()
                .id(user.getId())
                .codedEmail(user.getCodedEmail())
                .name(user.getName())
                .introduction(user.getIntroduction())
                .build();
        OMRInfoResponseDto omrInfoResponseDto = OMRInfoResponseDto.builder()
                .color(omr.getColor())
                .pageNum(omr.getPageNum())
                .omrInfo(omrInfo)
                .noteInfo(noteInfo)
                .nicknameInfo(nicknameInfo)
                .showDateInfo(showDateInfo)
                .build();
        CardInfoResponseDto cardInfoResponseDto = CardInfoResponseDto.builder()
                .user(userInfoResponseDto)
                .omr(omrInfoResponseDto)
                .isOwner(true)
                .build();
        return cardInfoResponseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public CardInfoResponseDto getCardInfo(Long omrId) {
        OMR omr = omrRepository.findById(omrId).orElseThrow(OMRNotFoundException::new);
        User user = userRepository.findById(omr.getUser().getId()).orElseThrow(() -> new UserNotFoundException("수험생 정보가 올바르지 않습니다."));

        List<Note> list = omr.getNoteList();
        int[][] omrInfo = new int[20][5];
        long[][] noteInfo = new long[20][5];
        String[][] nicknameInfo = new String[20][5];
        String[][] showDateInfo = new String[20][5];
        LocalDate today = LocalDate.now();

        for (int i = 0; i < list.size(); i++) {
            Note note = list.get(i);
            int r = note.getProblemNum();
            int c = note.getCheckNum();
            LocalDate day = LocalDate.parse(note.getShowDate(), DateTimeFormatter.ISO_DATE);
            if (day.isAfter(today)){
                omrInfo[r][c]=3;
            }else{
                omrInfo[r][c]=1;
            }
            noteInfo[r][c] = list.get(i).getId();
            nicknameInfo[r][c] = note.getNickname();
            showDateInfo[r][c] = note.getShowDate();
        }

        UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.builder()
                .id(user.getId())
                .codedEmail(user.getCodedEmail())
                .name(user.getName())
                .introduction(user.getIntroduction())
                .build();
        OMRInfoResponseDto omrInfoResponseDto = OMRInfoResponseDto.builder()
                .color(omr.getColor())
                .pageNum(omr.getPageNum())
                .omrInfo(omrInfo)
                .noteInfo(noteInfo)
                .nicknameInfo(nicknameInfo)
                .showDateInfo(showDateInfo)
                .build();
        CardInfoResponseDto cardInfoResponseDto = CardInfoResponseDto.builder()
                .user(userInfoResponseDto)
                .omr(omrInfoResponseDto)
                .isOwner(false)
                .build();
        return cardInfoResponseDto;
    }


}
