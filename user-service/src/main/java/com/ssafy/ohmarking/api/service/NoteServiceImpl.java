package com.ssafy.ohmarking.api.service;

import com.ssafy.ohmarking.api.request.*;
import com.ssafy.ohmarking.api.response.NoteInfoResponseDto;
import com.ssafy.ohmarking.common.exception.*;
import com.ssafy.ohmarking.common.util.TokenProvider;
import com.ssafy.ohmarking.db.entity.Note;
import com.ssafy.ohmarking.db.entity.OMR;
import com.ssafy.ohmarking.db.entity.User;
import com.ssafy.ohmarking.db.repository.NoteRepository;
import com.ssafy.ohmarking.db.repository.OMRRepository;
import com.ssafy.ohmarking.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {
    private final TokenProvider tokenProvider;
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final OMRRepository omrRepository;

    @Override
    public String updateFavorite(String accessToken, FavoriteDto favoriteDto) {
        String uid = tokenProvider.getUserId(accessToken);
        Note note = noteRepository.findById(favoriteDto.getNoteId()).orElseThrow(NoteNotFoundException::new);
        if (Long.parseLong(uid) != note.getOmr().getUser().getId()) {
            throw new AccessDeniedException();
        }
        note.updateIsFavorite(favoriteDto.getIsFavorite());
        return note.getIsFavorite() ? "응원 메시지 즐겨찾기 등록 성공" : "응원 메시지 즐겨찾기 해제 성공";
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteInfoResponseDto> getFavoriteList(String codedEmail) {
        User user = userRepository.getByCodedEmail(codedEmail).orElseThrow(UserNotFoundException::new);
        Long uid=user.getId();
        return noteRepository.findFavoritesByUserId(uid)
                        .stream()
                                .map(note -> NoteInfoResponseDto.builder()
                                        .noteId(note.getId())
                                        .nickname(note.getNickname())
                                        .content(note.getContent())
                                        .pageNum(note.getOmr().getPageNum())
                                        .problemNum(note.getProblemNum())
                                        .checkNum(note.getCheckNum())
                                        .build())
                                        .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteInfoResponseDto> searchByNickname(String nickname) {
        return noteRepository.findAllByNickname(nickname)
                .stream()
                .map(note -> NoteInfoResponseDto.builder()
                        .pageNum(note.getOmr().getPageNum())
                        .problemNum(note.getProblemNum())
                        .checkNum(note.getCheckNum())
                        .showDate(note.getShowDate())
                        .date(note.getDate())
                        .noteId(note.getId())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public NoteInfoResponseDto getNoteInfo(String accessToken, Long noteId) {
        String uid = tokenProvider.getUserId(accessToken);
        Note note = noteRepository.findById(noteId).orElseThrow(NoteNotFoundException::new);
        if (Long.parseLong(uid) == note.getOmr().getUser().getId()) {
            note.updateIsOpened(true);
        }

        NoteInfoResponseDto noteInfoResponseDto = NoteInfoResponseDto.builder()
                .nickname(note.getNickname())
                .content(note.getContent())
                .showDate(note.getShowDate())
                .date(note.getDate())
                .problemNum(note.getProblemNum())
                .checkNum(note.getCheckNum())
                .isFavorite(note.getIsFavorite())
                .build();
        return noteInfoResponseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public NoteInfoResponseDto getNoteInfo(CheckNoteDto checkNoteDto) {
        Note note = noteRepository.findById(checkNoteDto.getNoteId()).orElseThrow(NoteNotFoundException::new);
        if (!note.getPwd().equals(checkNoteDto.getPwd())) {
            throw new AccessDeniedException();
        }
        NoteInfoResponseDto noteInfoResponseDto = NoteInfoResponseDto.builder()
                .nickname(note.getNickname())
                .content(note.getContent())
                .showDate(note.getShowDate())
                .date(note.getDate())
                .problemNum(note.getProblemNum())
                .checkNum(note.getCheckNum())
                .build();
        return noteInfoResponseDto;
    }

    @Override
    public Map<String, Object> deleteNote(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(NoteNotFoundException::new);
        Long userId = note.getOmr().getUser().getId();
        Long omrId = note.getOmr().getId();
        int pageNum = note.getOmr().getPageNum();
        noteRepository.deleteById(noteId);
        List<Long> omrList = omrRepository.findOMRIdList(userId);
        if (noteRepository.getNoteCount(omrId) == 0 && omrList.size() > 1) {
            for (int i = pageNum + 1; i < omrList.size(); i++) {
                OMR omr = omrRepository.findById(omrList.get(i)).orElseThrow(OMRNotFoundException::new);
                omr.updatePageNum(omr.getPageNum() - 1);
            }
            omrRepository.deleteById(omrId);
            omrList = omrRepository.findOMRIdList(userId);
        }
        List<Long> finalOmrList = omrList;
        return new HashMap<String, Object>() {
            {
                put("omrList", finalOmrList);
            }
        };
    }

    @Override
    public void updateNote(NoteUpdateDto noteUpdateDto) {
        Note note = noteRepository.findById(noteUpdateDto.getNoteId()).orElseThrow(NoteNotFoundException::new);
        note.updateNote(noteUpdateDto);
    }

    @Override
    public Map<String, Long> writeNote(NoteRegisterDto noteRegisterDto) {
        OMR omr = omrRepository.findById(noteRegisterDto.getOmrId()).orElseThrow(OMRNotFoundException::new);

        Integer checkNum = noteRegisterDto.getCheckNum();
        Integer problemNum = noteRegisterDto.getProblemNum();
        if (checkNum < 0 || checkNum >= 5 || problemNum < 0 || problemNum >= 20) {
            throw new NoteNumberException();
        }

        // 추가 될 수 있는 사항 : 같은 위치에 이미 노트가 있으면 노트 추가 안 되게

        Note note = Note.builder()
                .nickname(noteRegisterDto.getNickname())
                .content(noteRegisterDto.getContent())
                .pwd(noteRegisterDto.getPwd())
                .date(LocalDate.now().toString())
                .showDate(noteRegisterDto.getShowDate())
                .problemNum(problemNum)
                .checkNum(checkNum)
                .omr(omr)
                .build();
        noteRepository.save(note);
        return new HashMap<String, Long>() {
            {
                put("noteId", note.getId());
            }
        };
    }

    @Override
    public NoteInfoResponseDto getNoteInfoByNoteId(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(NoteNotFoundException::new);

        NoteInfoResponseDto noteInfoResponseDto = NoteInfoResponseDto.builder()
                .nickname(note.getNickname())
                .content(note.getContent())
                .showDate(note.getShowDate())
                .date(note.getDate())
                .problemNum(note.getProblemNum())
                .checkNum(note.getCheckNum())
                .isFavorite(note.getIsFavorite())
                .build();
        return noteInfoResponseDto;
    }
}
