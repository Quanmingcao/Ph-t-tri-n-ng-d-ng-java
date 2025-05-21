package com.example.MyJavaPostgreSQLApp.Entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlaylistSongsId implements Serializable {
    private Integer playlistid;
    private Integer songid;

    public PlaylistSongsId() {
    }

    public PlaylistSongsId(Integer playlistid, Integer songid) {
        this.playlistid = playlistid;
        this.songid = songid;
    }

    // Getters và Setters
    public Integer getPlaylistid() {
        return playlistid;
    }

    public void setPlaylistid(Integer playlistid) {
        this.playlistid = playlistid;
    }

    public Integer getSongid() {
        return songid;
    }

    public void setSongid(Integer songid) {
        this.songid = songid;
    }

    // equals và hashCode để đảm bảo nhận diện đúng
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof PlaylistSongsId))
            return false;
        PlaylistSongsId that = (PlaylistSongsId) o;
        return Objects.equals(playlistid, that.playlistid) &&
                Objects.equals(songid, that.songid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playlistid, songid);
    }
}