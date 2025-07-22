package com.example.Random_Excuse_API.model;

import jakarta.persistence.*;

@Entity
public class Excuse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String excuse;
    private String category;

    public Excuse() {
        // Default constructor for JPA
    }

    public Excuse(String excuse, String category) {
        this.excuse = excuse;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getExcuse() {
        return excuse;
    }

    public void setExcuse(String excuse) {
        this.excuse = excuse;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
}
