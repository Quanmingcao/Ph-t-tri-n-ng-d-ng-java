import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Song = {
  songid: number;
  name: string;
  description: string;
  image: string;
  filename: string;
  genre: string;
};

type Favorite = {
  userid: number;
  songid: number;
};

const FavoriteList: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoritesAndSongs = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("Người dùng chưa đăng nhập!");
          return;
        }

        const user = JSON.parse(storedUser);
        const userid = user.userid;

        // Lấy danh sách bài hát yêu thích của người dùng
        const favoritesRes = await axios.get<Favorite[]>(
          `http://localhost:8080/favorites/all`
        );
        const userFavorites = favoritesRes.data.filter(
          (fav) => fav.userid === userid
        );
        setFavorites(userFavorites);

        // Lấy danh sách songid từ danh sách yêu thích
        const songIds = userFavorites.map((fav) => fav.songid);

        // Truy vấn thông tin chi tiết của các bài hát yêu thích
        const songsRes = await axios.get<Song[]>(
          "http://localhost:8080/songs/all"
        );
        const favoriteSongs = songsRes.data.filter((song) =>
          songIds.includes(song.songid)
        );
        setSongs(favoriteSongs);
      } catch (error) {
        console.error("Lỗi khi tải danh sách yêu thích:", error);
        setError("Không thể tải danh sách yêu thích. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesAndSongs();
  }, []);

  const handleRemoveFavorite = async (userid: number, songid: number) => {
    if (
      !window.confirm(
        "Bạn có chắc chắn muốn xóa bài hát này khỏi danh sách yêu thích?"
      )
    )
      return;

    try {
      await axios.delete(`http://localhost:8080/favorites/remove`, {
        params: { userid, songid },
      });
      setFavorites((prev) => prev.filter((fav) => fav.songid !== songid));
      setSongs((prev) => prev.filter((song) => song.songid !== songid));
      alert("Bài hát đã được xóa khỏi danh sách yêu thích!");
    } catch (error) {
      console.error("Lỗi khi xóa bài hát yêu thích:", error);
      alert("Không thể xóa bài hát. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{
        backgroundImage: "url('/images/bgss.jpg')", // Nền xám nhạt
        padding: "15px",
      }}
    >
      {songs.map((song) => (
        <div
          key={song.songid}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundImage: "url('/images/bgss.jpg')", // Nền trắng
            padding: "10px",
            margin: "10px 0",
            border: "2px solid #E0E0E0", // Xám nhạt
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
                color: "#3F51B5", // Xanh tím dịu
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
            <button
              onClick={() =>
                handleRemoveFavorite(
                  favorites.find((fav) => fav.songid === song.songid)?.userid!,
                  song.songid
                )
              }
              style={{
                marginTop: "10px",
                backgroundColor: "lightcoral",
                border: "1px solid red",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Xóa khỏi yêu thích
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
      ))}
    </div>
  );
};

export default FavoriteList;
