package com.example.MyJavaPostgreSQLApp.repositories;

import com.example.MyJavaPostgreSQLApp.Entities.Favorite;
import com.example.MyJavaPostgreSQLApp.Entities.FavoriteId;
import org.springframework.data.repository.CrudRepository;

public interface FavoriteRepository extends CrudRepository<Favorite, FavoriteId> {
    static void deleteBySongid(Integer id) {
    }
}
