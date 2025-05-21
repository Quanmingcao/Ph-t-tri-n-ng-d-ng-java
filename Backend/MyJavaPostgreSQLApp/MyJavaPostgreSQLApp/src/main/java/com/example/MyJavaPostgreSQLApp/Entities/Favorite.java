package com.example.MyJavaPostgreSQLApp.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "favorites")
public class Favorite {

    @EmbeddedId
    private FavoriteId id;

    public Favorite() {
    }

    public Favorite(FavoriteId id) {
        this.id = id;
    }

    public FavoriteId getId() {
        return id;
    }

    public void setId(FavoriteId id) {
        this.id = id;
    }

    public Integer getUserid() {
        return id != null ? id.getUserid() : null;
    }

    public Integer getSongid() {
        return id != null ? id.getSongid() : null;
    }
}
