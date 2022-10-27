package com.ssafy.ohmarking.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/event")
public class EventController {
    private static final Logger logger = LoggerFactory.getLogger(NoteController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
}
