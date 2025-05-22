import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

type Song = {
  songid: number;
  name: string;
  description: string;
  image: string;
  filename: string;
  genre: string;
  views: number;
  downloads: number;
  approved: boolean;
};

type Playlist = {
  playlistid: number;
  name: string;
  userid: number;
};

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [localSearch, setLocalSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("Tất cả");
  const [sortBy, setSortBy] = useState<"downloads" | "views" | "name">(
    "downloads"
  );
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  // Lấy từ khóa tìm kiếm từ URL
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchKeyword(params.get("search")?.toLowerCase() || "");
    setCurrentPage(1); // reset về trang 1 khi search
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsRes = await axios.get<Song[]>(
          "http://localhost:8080/songs/all"
        );
        setSongs(songsRes.data);

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const playlistsRes = await axios.get<Playlist[]>(
            "http://localhost:8080/playlists/all"
          );
          const userPlaylists = playlistsRes.data.filter(
            (pl) => pl.userid === user.userid
          );
          setPlaylists(userPlaylists);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lấy danh sách genre duy nhất và sắp xếp alphabet
  const genres = Array.from(new Set(songs.map((song) => song.genre)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  // 1. Chỉ lấy bài hát đã duyệt
  const approvedSongs = songs.filter((song) => song.approved);

  // 2. Lọc theo thể loại
  const genreFilteredSongs =
    selectedGenre === "Tất cả"
      ? approvedSongs
      : approvedSongs.filter((song) => song.genre === selectedGenre);

  // 3. Lọc theo từ khóa tìm kiếm (nếu có)
  const searchFilteredSongs = localSearch
    ? genreFilteredSongs.filter(
        (s) =>
          (s.name?.toLowerCase() || "").includes(localSearch.toLowerCase()) ||
          (s.genre?.toLowerCase() || "").includes(localSearch.toLowerCase()) ||
          (s.description?.toLowerCase() || "").includes(
            localSearch.toLowerCase()
          )
      )
    : genreFilteredSongs;

  // 4. Sắp xếp
  const sortedSongs = [...searchFilteredSongs].sort((a, b) => {
    if (sortBy === "downloads") return b.downloads - a.downloads;
    if (sortBy === "views") return b.views - a.views;
    return a.name.localeCompare(b.name);
  });

  // 5. Phân trang
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = sortedSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(sortedSongs.length / songsPerPage);

  const handleAddToPlaylist = async (playlistid: number) => {
    if (!selectedSong) return;

    try {
      await axios.post("http://localhost:8080/playlist-songs/add", {
        playlistid,
        songid: selectedSong,
      });
      alert("Bài hát đã được thêm vào playlist!");
      setSelectedSong(null);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      alert("Không thể thêm bài hát vào playlist. Vui lòng thử lại.");
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      alert("Vui lòng nhập tên playlist!");
      return;
    }

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Bạn cần đăng nhập để tạo playlist!");
        return;
      }
      const user = JSON.parse(storedUser);
      await axios.post("http://localhost:8080/playlists/add", {
        name: newPlaylistName,
        userid: user.userid,
      });

      const playlistsRes = await axios.get<Playlist[]>(
        "http://localhost:8080/playlists/all"
      );
      const userPlaylists = playlistsRes.data.filter(
        (pl) => pl.userid === user.userid
      );
      setPlaylists(userPlaylists);

      alert("Playlist mới đã được tạo!");
      setNewPlaylistName("");
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Không thể tạo playlist. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: "24px",
          color: "#4CAF50",
          textShadow: "1px 1px #8BC34A",
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
          color: "#F44336",
          backgroundColor: "#FFEBEE",
          padding: "10px",
          border: "2px solid #E57373",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url('/images/bgss.jpg')",
        padding: "15px",
      }}
    >
      {/* Dropdown chọn thể loại và sắp xếp */}
      <div style={{ marginBottom: 20, display: "flex", gap: 24 }}>
        <div>
          <label style={{ fontWeight: "bold", marginRight: 8 }}>
            Thể loại:
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1); // reset về trang 1 khi đổi thể loại
            }}
            style={{
              padding: "5px 10px",
              border: "1px solid #3F51B5",
              borderRadius: 4,
              fontFamily: "Comic Sans MS, cursive",
              fontSize: "16px",
            }}
          >
            <option value="Tất cả">Tất cả</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 20, display: "flex", gap: 24 }}>
          {/* Thanh tìm kiếm cục bộ */}
          <input
            type="text"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm kiếm bài hát tại đây..."
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              backgroundColor: "#e0f7fa",
              color: "#222",
              border: "2px solid #00bcd4",
              borderRadius: 6,
              padding: "6px",
              width: "260px",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Danh sách bài hát chỉ hiển thị bài hát của trang hiện tại */}
      {currentSongs.map((song) => (
        <div
          key={song.songid}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundImage: "url('/images/bgss.jpg')",
            padding: "10px",
            margin: "10px 0",
            border: "2px solid #E0E0E0",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={`/images/${song.image}`}
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
                color: "#3F51B5",
                margin: 0,
              }}
            >
              <Link
                to={`/songs/${song.songid}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {song.name}
              </Link>
            </h2>

            <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                color: "#757575",
                margin: "5px 0 0",
                maxWidth: "500px",
              }}
            >
              {song.description}
            </p>
            <div style={{ marginTop: "10px" }}>
              <button
                style={{
                  backgroundColor: "cyan",
                  border: "1px solid blue",
                  padding: "5px 10px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedSong(song.songid)}
              >
                Thêm vào Playlist
              </button>
              <button
                style={{
                  backgroundColor: "pink",
                  border: "1px solid red",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  try {
                    const storedUser = localStorage.getItem("user");
                    if (!storedUser) {
                      alert(
                        "Bạn cần đăng nhập để thêm bài hát vào danh sách yêu thích!"
                      );
                      return;
                    }

                    const user = JSON.parse(storedUser);
                    await axios.post("http://localhost:8080/favorites/add", {
                      userid: user.userid,
                      songid: song.songid,
                    });
                    alert(
                      `Bài hát "${song.name}" đã được thêm vào danh sách yêu thích!`
                    );
                  } catch (error) {
                    console.error(
                      "Lỗi khi thêm bài hát vào danh sách yêu thích:",
                      error
                    );
                    alert(
                      "Không thể thêm bài hát vào danh sách yêu thích. Vui lòng thử lại."
                    );
                  }
                }}
              >
                Yêu thích
              </button>
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
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "0 4px",
              padding: "6px 12px",
              background: currentPage === i + 1 ? "#4CAF50" : "#fff",
              color: currentPage === i + 1 ? "#fff" : "#333",
              border: "1px solid #4CAF50",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal chọn playlist */}
      {selectedSong && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid black",
            zIndex: 1000,
          }}
        >
          <h3>Chọn Playlist</h3>
          {playlists.map((playlist) => (
            <div key={playlist.playlistid}>
              <button
                onClick={() => handleAddToPlaylist(playlist.playlistid)}
                style={{
                  marginBottom: "10px",
                  backgroundColor: "lightblue",
                  border: "1px solid blue",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                {playlist.name}
              </button>
            </div>
          ))}
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Nhập tên playlist mới"
              style={{
                padding: "5px",
                width: "100%",
                marginBottom: "10px",
                border: "1px solid gray",
              }}
            />
            <button
              onClick={handleCreatePlaylist}
              style={{
                backgroundColor: "lightgreen",
                border: "1px solid green",
                padding: "5px 10px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Tạo Playlist Mới
            </button>
            <button
              onClick={() => setSelectedSong(null)}
              style={{
                backgroundColor: "lightcoral",
                border: "1px solid red",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;
