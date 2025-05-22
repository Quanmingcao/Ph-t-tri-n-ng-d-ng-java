import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState(""); // State cho ô tìm kiếm

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Xử lý tìm kiếm: chuyển hướng sang trang /songs?search=...
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/songs?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header
      style={{
        backgroundImage:
          "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXhrOWZibXR1bHd4cm9vN2VlbmU0cmt2bDhmb2p0Ym96dGw4bHVtcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1274JrCgA8hP7a/giphy.gif')",
        backgroundSize: "auto",
        padding: "18px 10px 10px 10px",
        width: "100%",
        height: 200,
        textAlign: "center",
        borderBottom: "4px solid #00bcd4",
      }}
    >
      <h1
        style={{
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: "38px",
          color: "#fff",
          textShadow: "2px 2px 8px #00bcd4, 0 0 10px #222",
          margin: "0 0 16px 0",
          letterSpacing: 2,
        }}
      >
        SOUNDDOWNNOW
      </h1>
      <div style={{ margin: "10px 0" }}></div>
      <div>
        {user ? (
          <div>
            <span
              style={{
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "20px",
                color: "#00bcd4",
                marginRight: "10px",
              }}
            >
              Xin chào, {user.name}!
              {user?.role === "Administrator" && (
                <button onClick={() => navigate("/admin")}>Admin</button>
              )}
            </span>
            <button
              style={{
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "18px",
                backgroundColor: "#ff1744",
                color: "#fff",
                border: "2px solid #00bcd4",
                borderRadius: 6,
                padding: "5px 18px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <button
            style={{
              fontFamily: "Comic Sans MS, cursive",
              fontSize: "18px",
              backgroundColor: "#00e676",
              color: "#222",
              border: "2px solid #00bcd4",
              borderRadius: 6,
              padding: "5px 18px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Đăng nhập / Đăng ký
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
