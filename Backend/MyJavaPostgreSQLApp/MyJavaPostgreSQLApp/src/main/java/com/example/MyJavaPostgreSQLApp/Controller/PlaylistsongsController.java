package com.example.MyJavaPostgreSQLApp.Controller;

import com.example.MyJavaPostgreSQLApp.Entities.Playlistsongs;
import com.example.MyJavaPostgreSQLApp.Entities.PlaylistSongsId;
import com.example.MyJavaPostgreSQLApp.repositories.PlaylistsongsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/playlist-songs")
public class PlaylistsongsController {

    @Autowired
    private PlaylistsongsRepository playlistSongsRepository;

    // Thêm bài hát vào playlist
    @PostMapping("/add")
    public ResponseEntity<String> addSongToPlaylist(@RequestBody Playlistsongs playlistSongs) {
        PlaylistSongsId id = new PlaylistSongsId(playlistSongs.getPlaylistid(), playlistSongs.getSongid());
        if (playlistSongsRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Bài hát đã tồn tại trong playlist!");
        }
        playlistSongsRepository.save(playlistSongs);
        return ResponseEntity.ok("Thêm bài hát vào playlist thành công!");
    }

    // Xóa bài hát khỏi playlist
    @DeleteMapping("/delete")
    public ResponseEntity<String> removeSongFromPlaylist(@RequestParam Integer playlistid,
            @RequestParam Integer songid) {
        PlaylistSongsId id = new PlaylistSongsId(playlistid, songid);
        if (!playlistSongsRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Không tìm thấy bài hát trong playlist!");
        }
        playlistSongsRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa bài hát khỏi playlist.");
    }

    // Lấy tất cả bài hát trong tất cả playlist
    @GetMapping("/all")
    public @ResponseBody Iterable<Playlistsongs> getAllPlaylistSongs() {
        return playlistSongsRepository.findAll();
    }
}
