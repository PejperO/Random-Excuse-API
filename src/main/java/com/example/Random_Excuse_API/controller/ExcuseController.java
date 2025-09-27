package com.example.Random_Excuse_API.controller;

import com.example.Random_Excuse_API.model.Excuse;
import com.example.Random_Excuse_API.service.ExcuseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/manage")
    public String addExcuse() {
        return "TODO: Put all the CRUD operations here";
    }
    @GetMapping
    public List<Excuse> getAll() {
        return excuseService.getAll();
    }

    @PostMapping
    public Excuse create(@RequestBody Excuse excuse) {
        return excuseService.create(excuse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Excuse> update(@PathVariable Long id, @RequestBody Excuse updated) {
        return excuseService.update(id, updated)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (excuseService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

