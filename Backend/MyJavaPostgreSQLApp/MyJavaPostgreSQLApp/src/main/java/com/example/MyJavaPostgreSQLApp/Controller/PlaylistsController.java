package com.example.MyJavaPostgreSQLApp.Controller;
import com.example.MyJavaPostgreSQLApp.repositories.PlaylistsongsRepository;
import com.example.MyJavaPostgreSQLApp.Entities.Playlistss;
import com.example.MyJavaPostgreSQLApp.repositories.PlaylistsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(path = "/playlists")
public class PlaylistsController {

    @Autowired
    private PlaylistsRepository playlistsRepository;

    // Thêm playlist mới
    @PostMapping(path = "/add")
    public @ResponseBody String addNewPlaylist(@RequestBody Playlistss playlist) {
        playlistsRepository.save(playlist);
        return "Playlist saved!";
    }

    // Lấy tất cả playlists
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Playlistss> getAllPlaylists() {
        return playlistsRepository.findAll();
    }

    // Xóa playlist theo ID
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deletePlaylist(@PathVariable Integer id) {
        if (!playlistsRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: Playlist not found!");
        }

        // Xóa tất cả các bản ghi liên quan trong bảng playlistsongs
        PlaylistsongsRepository.deleteByPlaylistid(id);

        // Xóa playlist
        playlistsRepository.deleteById(id);
        return ResponseEntity.ok("Playlist deleted successfully");
    }

    // Cập nhật playlist
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updatePlaylist(@PathVariable Integer id, @RequestBody Playlistss playlist) {
        Optional<Playlistss> optionalPlaylist = playlistsRepository.findById(id);
        if (optionalPlaylist.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Playlist not found!");
        }

        Playlistss existing = optionalPlaylist.get();
        existing.setName(playlist.getName());
        existing.setUserid(playlist.getUserid());

        playlistsRepository.save(existing);
        return ResponseEntity.ok("Playlist updated successfully!");
    }
}
