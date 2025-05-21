package com.example.MyJavaPostgreSQLApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MyJavaPostgreSQLApp.Entities.songhistory;

public interface songhistoryRepository extends JpaRepository<songhistory, Integer> {
}