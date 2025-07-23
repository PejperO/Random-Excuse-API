package com.example.Random_Excuse_API.controller;

import com.example.Random_Excuse_API.model.Excuse;
import com.example.Random_Excuse_API.service.ExcuseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/excuse")
public class ExcuseController {

    private final ExcuseService excuseService;

    public ExcuseController(ExcuseService excuseService) {
        this.excuseService = excuseService;
    }

    @GetMapping("/{category}")
    public ResponseEntity<Excuse> getExcuseByCategory(@PathVariable String category) {
        return ResponseEntity.ok(excuseService.getExcuse(category));
    }

    @GetMapping("/add")
    public String addExcuse() {
        return "TODO: Implement addExcuse method, for now it is a placeholder.";
    }
}

