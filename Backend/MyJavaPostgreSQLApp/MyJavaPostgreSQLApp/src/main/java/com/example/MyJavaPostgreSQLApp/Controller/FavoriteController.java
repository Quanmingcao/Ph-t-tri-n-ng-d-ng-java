package com.example.MyJavaPostgreSQLApp.Controller;

import com.example.MyJavaPostgreSQLApp.Entities.Favorite;
import com.example.MyJavaPostgreSQLApp.Entities.FavoriteId;
import com.example.MyJavaPostgreSQLApp.repositories.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addFavorite(@RequestBody FavoriteId id) {
        if (favoriteRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Đã có bài hát này trong danh sách yêu thích!");
        }
        favoriteRepository.save(new Favorite(id));
        return ResponseEntity.ok("Đã thêm vào yêu thích.");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFavorite(@RequestParam Integer userid, @RequestParam Integer songid) {
        FavoriteId id = new FavoriteId(userid, songid);
        if (!favoriteRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Không tìm thấy trong danh sách yêu thích!");
        }
        favoriteRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa khỏi danh sách yêu thích.");
    }

    @GetMapping("/all")
    public Iterable<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }
}
