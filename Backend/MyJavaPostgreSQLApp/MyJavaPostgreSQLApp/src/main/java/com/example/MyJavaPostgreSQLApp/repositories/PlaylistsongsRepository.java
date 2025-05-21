package com.example.MyJavaPostgreSQLApp.repositories;

import com.example.MyJavaPostgreSQLApp.Entities.Playlistsongs;
import com.example.MyJavaPostgreSQLApp.Entities.PlaylistSongsId;
import org.springframework.data.repository.CrudRepository;

public interface PlaylistsongsRepository extends CrudRepository<Playlistsongs, PlaylistSongsId> {
    static void deleteByPlaylistid(Integer id) {
    }
}
