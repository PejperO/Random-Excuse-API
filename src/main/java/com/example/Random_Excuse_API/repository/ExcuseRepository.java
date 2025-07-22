package com.example.Random_Excuse_API.repository;

import com.example.Random_Excuse_API.model.Excuse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExcuseRepository extends JpaRepository<Excuse, Long> {
    List<Excuse> findByCategory(String excuseCategory);
}
