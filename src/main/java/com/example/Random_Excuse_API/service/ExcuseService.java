package com.example.Random_Excuse_API.service;

import com.example.Random_Excuse_API.model.Excuse;
import com.example.Random_Excuse_API.repository.ExcuseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ExcuseService {

    private final ExcuseRepository excuseRepository;
    private final Random random = new Random();

    public ExcuseService(ExcuseRepository excuseRepository) {
        this.excuseRepository = excuseRepository;
    }

    public Excuse getRandomExcuse() {
        List<Excuse> excuses = excuseRepository.findAll();
        if (excuses.isEmpty()) {
            return new Excuse("No excuses available.", "General");
        }
        return excuses.get(random.nextInt(excuses.size()));
    }
}