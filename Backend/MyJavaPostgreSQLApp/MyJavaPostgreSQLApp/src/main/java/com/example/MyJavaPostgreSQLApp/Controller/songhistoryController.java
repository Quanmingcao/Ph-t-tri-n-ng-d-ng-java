package com.example.MyJavaPostgreSQLApp.Controller;

import com.example.MyJavaPostgreSQLApp.Entities.songhistory;
import com.example.MyJavaPostgreSQLApp.repositories.songhistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/history")
public class songhistoryController {

    @Autowired
    private songhistoryRepository songHistoryRepository;

    // Thêm lịch sử nghe nhạc mới
    @PostMapping(path = "/add")
    public @ResponseBody String addNewHistory(@RequestBody songhistory history) {
        songHistoryRepository.save(history);
        return "Saved";
    }

    // Lấy tất cả lịch sử
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<songhistory> getAllHistory() {
        return songHistoryRepository.findAll();
    }

    // Xóa lịch sử theo ID
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteHistory(@PathVariable Integer id) {
        if (!songHistoryRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: History not found!");
        }
        songHistoryRepository.deleteById(id);
        return ResponseEntity.ok("History deleted successfully");
    }

    // Cập nhật lịch sử nghe nhạc
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateHistory(@PathVariable Integer id, @RequestBody songhistory updatedHistory) {
        Optional<songhistory> optionalHistory = songHistoryRepository.findById(id);
        if (optionalHistory.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: History not found!");
        }

        songhistory history = optionalHistory.get();
        history.setUserid(updatedHistory.getUserid());
        history.setSongid(updatedHistory.getSongid());
        history.setPlaytime(updatedHistory.getPlaytime());

        songHistoryRepository.save(history);
        return ResponseEntity.ok("History updated successfully!");
    }
}
