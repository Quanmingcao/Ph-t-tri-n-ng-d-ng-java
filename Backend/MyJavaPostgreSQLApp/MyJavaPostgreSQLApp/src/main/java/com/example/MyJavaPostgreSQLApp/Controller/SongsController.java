package com.example.MyJavaPostgreSQLApp.Controller;
import jakarta.transaction.Transactional;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import com.example.MyJavaPostgreSQLApp.Entities.songs;
import com.example.MyJavaPostgreSQLApp.repositories.SongsRepository;
import com.example.MyJavaPostgreSQLApp.Entities.Favorite;
import com.example.MyJavaPostgreSQLApp.Entities.FavoriteId;
import com.example.MyJavaPostgreSQLApp.repositories.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.UrlResource;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(path = "/songs")
public class SongsController {

    @Autowired
    private SongsRepository songsRepository;

    // Thêm bài hát mới
    @PostMapping(path = "/add")
    public @ResponseBody String addNewSong(@RequestBody songs song) {
        songsRepository.save(song);
        return "Saved";
    }
    @DeleteMapping("/songs/delete/{songid}")
    public ResponseEntity<?> deleteSong(@PathVariable int songid) {
        if (!songsRepository.existsById(songid)) {
            return ResponseEntity.notFound().build();
        }
        songsRepository.deleteById(songid);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("folder") String folder) throws IOException {

        // Trỏ tới thư mục frontend chứa audio/images (bạn khai báo đường dẫn tuyệt đối)
        String frontendPath = "D:/frontendreact/frontendreact";
        String saveDir = folder.equals("audio") ? "audio" : "images";

        File targetDir = new File(frontendPath, saveDir);
        if (!targetDir.exists()) {
            targetDir.mkdirs();
        }

        File saveFile = new File(targetDir, file.getOriginalFilename());
        file.transferTo(saveFile);

        return ResponseEntity.ok(Map.of("filename", file.getOriginalFilename()));
    }
    @PutMapping("/songs/increment-view/{id}")
    public ResponseEntity<String> incrementSongView(@PathVariable Integer id) {
        Optional<songs> optionalSong = songsRepository.findById(id);
        if (optionalSong.isPresent()) {
            songs song = optionalSong.get();
            song.setViews(song.getViews() + 1);
            songsRepository.save(song);
            return ResponseEntity.ok("View incremented");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/songs/increment-download/{id}")
    public ResponseEntity<String> incrementDownload(@PathVariable Integer id) {
        Optional<songs> optionalSong = songsRepository.findById(id);
        if (optionalSong.isPresent()) {
            songs song = optionalSong.get();
            song.setDownloads(song.getDownloads() + 1);  // ✅ Tăng downloads, không phải views
            songsRepository.save(song);
            return ResponseEntity.ok("Download incremented");
        }
        return ResponseEntity.notFound().build();
    }


    // Lấy danh sách tất cả bài hát
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<songs> getAllSongs() {
        return songsRepository.findAll();
    }

    // Xóa bài hát theo ID
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<String> deleteSong(@PathVariable Integer id) {
        if (!songsRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Song not found!");
        }

        // Xóa các dòng trong bảng favorites trước
        FavoriteRepository.deleteBySongid(id);

        // Sau đó xóa bài hát
        songsRepository.deleteById(id);

        return ResponseEntity.ok("Song deleted successfully");
    }


    @GetMapping("/audio/{filename:.+}")
    public ResponseEntity<Resource> getAudio(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get("D:/MyJavaPostgreSQLApp/MyJavaPostgreSQLApp/audio").resolve(filename).normalize();
        System.out.println("Đang tìm file: " + filePath.toString());
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/songs/approve")
    public ResponseEntity<?> approveSong(@RequestBody Map<String, Integer> payload) {
        Integer songid = payload.get("songid");
        Optional<songs> songOpt = songsRepository.findById(songid);
        if (songOpt.isPresent()) {
            songs song = songOpt.get();
            song.setApproved(true);
            songsRepository.save(song);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    // Cập nhật bài hát
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateSong(@PathVariable Integer id, @RequestBody songs song) {
        Optional<songs> optionalSong = songsRepository.findById(id);
        if (optionalSong.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Song not found!");
        }

        songs newSong = optionalSong.get();
        newSong.setName(song.getName());
        newSong.setGenre(song.getGenre());
        newSong.setFilename(song.getFilename());
        newSong.setDescription(song.getDescription());
        newSong.setImage(song.getImage());
        newSong.setViews(song.getViews());
        newSong.setDownloads(song.getDownloads());
        newSong.setApproved(song.getApproved());
        songsRepository.save(newSong);
        return ResponseEntity.ok("Song updated successfully!");
    }

}
