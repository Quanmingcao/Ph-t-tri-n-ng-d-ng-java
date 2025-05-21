
package com.example.MyJavaPostgreSQLApp.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "playlistsongs")
@IdClass(PlaylistSongsId.class)
public class Playlistsongs {

    @Id
    @Column(name = "playlistid")
    private Integer playlistid;

    @Id
    @Column(name = "songid")
    private Integer songid;

    public Playlistsongs() {
    }

    public Playlistsongs(Integer playlistid, Integer songid) {
        this.playlistid = playlistid;
        this.songid = songid;
    }

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
}
