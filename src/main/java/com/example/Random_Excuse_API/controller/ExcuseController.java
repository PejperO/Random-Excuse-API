package com.example.Random_Excuse_API.controller;

import com.example.Random_Excuse_API.model.Excuse;
import com.example.Random_Excuse_API.service.ExcuseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/excuse")
public class ExcuseController {

    private final ExcuseService excuseService;

    public ExcuseController(ExcuseService excuseService) {
        this.excuseService = excuseService;
    }

    @GetMapping("/random")
    public ResponseEntity<Excuse> getRandomExcuse() {
        return ResponseEntity.ok(excuseService.getRandomExcuse());
    }
}

