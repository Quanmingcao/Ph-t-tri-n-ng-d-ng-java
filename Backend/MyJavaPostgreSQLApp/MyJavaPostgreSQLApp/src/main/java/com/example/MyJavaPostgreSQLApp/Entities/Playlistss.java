package com.example.MyJavaPostgreSQLApp.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "playlists")
public class Playlistss {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "playlist_seq")
    @SequenceGenerator(name = "playlist_seq", sequenceName = "playlists_playlistid_seq", allocationSize = 1)
    private int playlistid;

    @Column(length = 255)
    private String name;

    private Integer userid;

    // Getters and setters
    public int getPlaylistid() {
        return playlistid;
    }

    public void setPlaylistid(int playlistid) {
        this.playlistid = playlistid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }
}
