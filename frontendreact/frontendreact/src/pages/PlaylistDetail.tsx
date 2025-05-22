import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

type Song = {
  songid: number;
  name: string;
  description: string;
  image: string;
  filename: string;
  genre: string;
};

type PlaylistSong = {
  playlistid: number;
  songid: number;
};
const handleRemoveSong = async (songid: number) => {
  try {
    await axios.delete(`http://localhost:8080/playlist-songs/remove`, {
      data: { playlistid: Number(id), songid },
    });
    setSongs((prev) => prev.filter((s) => s.songid !== songid));
  } catch (error) {
    alert("Xóa thất bại!");
  }
};
const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy playlist ID từ URL
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Lấy danh sách bài hát thuộc playlist từ PlaylistSong
        const playlistSongsRes = await axios.get<PlaylistSong[]>(
          `http://localhost:8080/playlist-songs/all`
        );
        const playlistSongs = playlistSongsRes.data.filter(
          (ps) => ps.playlistid === parseInt(id || "", 10)
        );

        // Lấy danh sách songid từ PlaylistSong
        const songIds = playlistSongs.map((ps) => ps.songid);

        // Lấy thông tin chi tiết bài hát từ danh sách songid
        const allSongsRes = await axios.get<Song[]>(
          `http://localhost:8080/songs/all`
        );
        const filteredSongs = allSongsRes.data.filter((song) =>
          songIds.includes(song.songid)
        );

        setSongs(filteredSongs);
        setError(null);
      } catch (error) {
        console.error("Error fetching playlist songs:", error);
        setError("Failed to fetch songs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: "24px",
          color: "#4CAF50", // Màu xanh lá dịu
          textShadow: "1px 1px #8BC34A", // Bóng chữ xanh lá nhạt
        }}
      >
        Loading songs...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: "24px",
          color: "#F44336", // Màu đỏ dịu
          backgroundColor: "#FFEBEE", // Màu nền đỏ nhạt
          padding: "10px",
          border: "2px solid #E57373", // Viền đỏ nhạt
        }}
      >
        {error}
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: "24px",
          color: "#03A9F4", // Màu xanh dương dịu
          backgroundColor: "#E1F5FE", // Màu nền xanh nhạt
          padding: "10px",
          border: "2px solid #81D4FA", // Viền xanh nhạt
        }}
      >
        No songs available in this playlist.
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url('/images/bgss.jpg')", // Màu nền xám nhạt
        padding: "15px",
      }}
    >
      {songs.map((song) => (
        <div
          key={song.songid}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundImage: "url('/images/bgss.jpg')", // Màu nền trắng
            padding: "10px",
            margin: "10px 0",
            border: "2px solid #E0E0E0", // Viền xám nhạt
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Bóng nhẹ
          }}
        >
          <img
            src={`/images/${song.name}.jpg`} // Truy vấn file từ thư mục public/images
            alt={song.name}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              border: "2px solid #BDBDBD",
              marginRight: "15px",
            }}
          />
          <div>
            <h2
              style={{
                fontFamily: "'Comic Sans MS', cursive",
                fontSize: "20px",
                color: "#3F51B5", // Màu xanh tím dịu
                margin: 0,
              }}
            >
              <Link
                to={`/songs/${song.songid}`} // Điều hướng đến trang chi tiết bài hát
                style={{
                  textDecoration: "none", // Loại bỏ gạch chân mặc định của liên kết
                  color: "inherit", // Giữ nguyên màu chữ từ phần tử cha
                  cursor: "pointer", // Đảm bảo con trỏ chuột là pointer
                }}
              >
                {song.name}
              </Link>
            </h2>
            <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                color: "#757575", // Màu xám dịu
                margin: "5px 0 0",
                maxWidth: "500px",
              }}
            >
              {song.description}
            </p>
            <a
              href={`/audio/${song.filename}`}
              download
              style={{
                backgroundColor: "#fff",
                border: "1px solid #4CAF50",
                color: "#388e3c",
                padding: "5px 10px",
                marginRight: "10px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Tải về
            </a>
            <button
              onClick={() => handleRemoveSong(song.songid)}
              style={{
                backgroundColor: "#ff5252",
                color: "#fff",
                border: "1px solid #ff5252",
                borderRadius: 4,
                padding: "5px 12px",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              Xóa khỏi danh sách phát
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistDetail;
