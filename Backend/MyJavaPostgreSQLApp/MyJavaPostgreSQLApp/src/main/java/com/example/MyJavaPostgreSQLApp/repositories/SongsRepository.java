package com.example.MyJavaPostgreSQLApp.repositories;

import com.example.MyJavaPostgreSQLApp.Entities.songs;
import org.springframework.data.repository.CrudRepository;

public interface SongsRepository extends CrudRepository<songs, Integer> {
}