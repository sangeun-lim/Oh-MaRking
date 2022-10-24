package com.ssafy.ohmarking.api.controller;

import com.ssafy.ohmarking.api.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/note")
public class NoteController {
    private static final Logger logger = LoggerFactory.getLogger(NoteController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final NoteController noteController;

    private NoteService noteService;

    @Autowired
    public NoteController(NoteController noteController) {
        this.noteController = noteController;
    }

}
