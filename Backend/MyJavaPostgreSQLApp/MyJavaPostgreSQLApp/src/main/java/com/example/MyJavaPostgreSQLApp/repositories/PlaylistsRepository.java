package com.example.MyJavaPostgreSQLApp.repositories;

import com.example.MyJavaPostgreSQLApp.Entities.Playlistss;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistsRepository extends CrudRepository<Playlistss, Integer> {
    // Có thể thêm các phương thức custom sau nếu cần
}