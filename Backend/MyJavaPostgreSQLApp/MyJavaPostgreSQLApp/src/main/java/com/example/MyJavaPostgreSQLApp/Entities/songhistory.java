package com.example.MyJavaPostgreSQLApp.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "songhistory")
public class songhistory {
    @Id

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "history_seq")
    @SequenceGenerator(name = "history_seq", sequenceName = "songhistory_historyid_seq", allocationSize = 1)
    private int historyid;

    private Integer userid;

    private Integer songid;

    private LocalDateTime playtime;

    // Getters & Setters
    public int getHistoryid() {
        return historyid;
    }

    public void setHistoryid(int historyid) {
        this.historyid = historyid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getSongid() {
        return songid;
    }

    public void setSongid(Integer songid) {
        this.songid = songid;
    }

    public LocalDateTime getPlaytime() {
        return playtime;
    }

    public void setPlaytime(LocalDateTime playtime) {
        this.playtime = playtime;
    }
}