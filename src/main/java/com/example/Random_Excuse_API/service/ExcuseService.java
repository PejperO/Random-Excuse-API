package com.example.Random_Excuse_API.service;

import com.example.Random_Excuse_API.model.Excuse;
import com.example.Random_Excuse_API.repository.ExcuseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ExcuseService {

    private final ExcuseRepository excuseRepository;
    private final Random random = new Random();

    public ExcuseService(ExcuseRepository excuseRepository) {
        this.excuseRepository = excuseRepository;
    }

    public List<Excuse> getAll() {
        return excuseRepository.findAll();
    }

    public Excuse create(Excuse excuse) {
        return excuseRepository.save(excuse);
    }

    public Optional<Excuse> update(Long id, Excuse updated) {
        return excuseRepository.findById(id).map(excuse -> {
            excuse.setExcuse(updated.getExcuse());
            excuse.setCategory(updated.getCategory());
            return excuseRepository.save(excuse);
        });
    }

    public boolean delete(Long id) {
        if (excuseRepository.existsById(id)) {
            excuseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Excuse getExcuse(String excuseCategory) {
        List<Excuse> excuses = excuseRepository.findByCategory(excuseCategory);
        if (excuses.isEmpty()) {
            return new Excuse("No excuses available.", excuseCategory);
        }
        return excuses.get(random.nextInt(excuses.size()));
    }
}