package com.example.Random_Excuse_API.repository;

import com.example.Random_Excuse_API.model.Excuse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExcuseRepository extends JpaRepository<Excuse, Long> { }
