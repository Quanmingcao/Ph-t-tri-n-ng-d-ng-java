import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type Playlist = {
  playlistid: number;
  name: string;
  userid: number;
};

type PlaylistSong = {
  playlistid: number;
  songid: number;
};

const PlaylistList: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistSongs, setPlaylistSongs] = useState<PlaylistSong[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("Người dùng chưa đăng nhập!");
          return;
        }

        const user = JSON.parse(storedUser);
        const userid = user.userid;

        const [playlistRes, playlistSongsRes] = await Promise.all([
          axios.get<Playlist[]>("http://localhost:8080/playlists/all"),
          axios.get<PlaylistSong[]>("http://localhost:8080/playlist-songs/all"),
        ]);

        const userPlaylists = playlistRes.data.filter(
          (pl) => pl.userid === userid
        );

        setPlaylists(userPlaylists);
        setPlaylistSongs(playlistSongsRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSongCount = (playlistid: number) => {
    return playlistSongs.filter((ps) => ps.playlistid === playlistid).length;
  };

  const handleDeletePlaylist = async (playlistid: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa playlist này?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/playlists/delete/${playlistid}`
      );
      setPlaylists((prev) => prev.filter((pl) => pl.playlistid !== playlistid));
      alert("Playlist đã được xóa!");
    } catch (error) {
      console.error("Lỗi khi xóa playlist:", error);
      alert("Không thể xóa playlist. Vui lòng thử lại.");
    }
  };

  const handleEditPlaylist = async (playlistid: number) => {
    if (!newPlaylistName.trim()) {
      alert("Vui lòng nhập tên mới cho playlist!");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/playlists/update/${playlistid}`, {
        name: newPlaylistName,
      });
      setPlaylists((prev) =>
        prev.map((pl) =>
          pl.playlistid === playlistid ? { ...pl, name: newPlaylistName } : pl
        )
      );
      alert("Tên playlist đã được cập nhật!");
      setEditingPlaylist(null);
      setNewPlaylistName("");
    } catch (error) {
      console.error("Lỗi khi sửa playlist:", error);
      alert("Không thể sửa playlist. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: "24px",
          color: "lime",
          textShadow: "2px 2px magenta",
          animation: "blink 1s step-end infinite",
          padding: "20px",
        }}
      >
        Loading playlists...
        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: "24px",
          color: "red",
          textShadow: "2px 2px yellow",
          padding: "20px",
        }}
      >
        Không có playlist nào!
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "5px outset fuchsia",
        boxShadow: "0 0 0 5px yellow",
        fontFamily: "'Comic Sans MS', cursive",
        color: "cyan",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          color: "yellow",
          textShadow: "3px 3px red",
          textAlign: "center",
          marginBottom: "15px",
          animation: "blink 1.5s step-end infinite",
        }}
      >
        Danh sách Playlist của bạn!!!
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {playlists.map((pl) => (
          <div
            key={pl.playlistid}
            style={{
              border: "3px inset aqua",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="/images/playlist.jpg"
              alt={pl.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                marginBottom: "10px",
                border: "2px solid #BDBDBD",
              }}
            />
            <h3
              style={{
                fontSize: "18px",
                color: "yellow",
                textShadow: "1px 1px magenta",
                marginBottom: "10px",
              }}
            >
              <Link
                to={`/playlists/${pl.playlistid}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {pl.name}
              </Link>
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "white",
                backgroundColor: "rgba(255, 0, 255, 0.3)",
                padding: "5px",
                border: "2px inset lime",
              }}
            >
              Số lượng bài hát: {getSongCount(pl.playlistid)}
            </p>
            <div style={{ marginTop: "10px" }}>
              {editingPlaylist === pl.playlistid ? (
                <>
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Nhập tên mới"
                    style={{
                      padding: "5px",
                      marginBottom: "10px",
                      width: "80%",
                    }}
                  />
                  <button
                    onClick={() => handleEditPlaylist(pl.playlistid)}
                    style={{
                      backgroundColor: "lightgreen",
                      border: "1px solid green",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditingPlaylist(null)}
                    style={{
                      backgroundColor: "lightcoral",
                      border: "1px solid red",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditingPlaylist(pl.playlistid)}
                    style={{
                      backgroundColor: "lightblue",
                      border: "1px solid blue",
                      padding: "5px 10px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeletePlaylist(pl.playlistid)}
                    style={{
                      backgroundColor: "pink",
                      border: "1px solid red",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
