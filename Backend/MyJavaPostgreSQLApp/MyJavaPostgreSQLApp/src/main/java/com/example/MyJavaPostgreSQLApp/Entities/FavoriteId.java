package com.example.MyJavaPostgreSQLApp.Entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FavoriteId implements Serializable {

    private Integer userid;
    private Integer songid;

    public FavoriteId() {
    }

    public FavoriteId(Integer userid, Integer songid) {
        this.userid = userid;
        this.songid = songid;
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

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof FavoriteId))
            return false;
        FavoriteId that = (FavoriteId) o;
        return Objects.equals(userid, that.userid) &&
                Objects.equals(songid, that.songid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userid, songid);
    }
}
