package com.example.MyJavaPostgreSQLApp.Entities;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "songs")
public class songs {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "songs_seq")
    @SequenceGenerator(name = "songs_seq", sequenceName = "songs_songid_seq", allocationSize = 1)
    @JsonProperty("songid") // Đảm bảo serialize thành "songid" trong JSON
    private int songid;

    private String name;
    private String genre;
    private String filename;
    private String description;
    private String image;
    private int views;        // Thêm trường này
    private int downloads;    // Thêm trường này
    private Boolean approved;
    public int getViews(){return views;}
    public int getDownloads(){return downloads;}


    public void setViews(int views) {
        this.views = views;
    }

    public void setDownloads(int downloads) {
        this.downloads = downloads;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    // Getter và setter cho songid
    public int getSongid() {
        return songid;
    }

    public void setSongid(int songid) {
        this.songid = songid;
    }

    // Getter và setter cho các trường khác
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}