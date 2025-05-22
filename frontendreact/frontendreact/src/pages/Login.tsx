import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8080/user/all");
      const users = response.data;

      const user = users.find(
        (u: any) => u.name === username && u.password === password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setMessage("Đăng nhập thành công!");
        window.location.href = "/"; // Chuyển hướng về trang chủ
      } else {
        setMessage("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (err) {
      setMessage("Đã xảy ra lỗi khi đăng nhập!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/bgss.jpg')", // Ảnh nền toàn trang
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh", // Chiều cao toàn màn hình
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white", // Màu nền của box đăng nhập
          color: "black",
          fontFamily: "'Comic Sans MS', cursive",
          textAlign: "center",
          padding: "50px",
          border: "5px solid magenta",
          boxShadow: "10px 10px 0px #000",
          width: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            color: "red",
            textShadow: "2px 2px yellow",
          }}
        >
          Đăng Nhập
        </h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "20px",
                color: "blue",
                textShadow: "1px 1px white",
              }}
            >
              Tên đăng nhập:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "16px",
                padding: "5px",
                border: "3px inset gray",
                backgroundColor: "yellow",
                color: "black",
                width: "80%",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "20px",
                color: "blue",
                textShadow: "1px 1px white",
              }}
            >
              Mật khẩu:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "16px",
                padding: "5px",
                border: "3px inset gray",
                backgroundColor: "yellow",
                color: "black",
                width: "80%",
              }}
            />
          </div>
          {message && (
            <p
              style={{
                fontSize: "18px",
                color: "red",
                backgroundColor: "white",
                padding: "5px",
                border: "2px dashed red",
                margin: "10px auto",
                width: "80%",
              }}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            style={{
              fontFamily: "'Comic Sans MS', cursive",
              fontSize: "20px",
              backgroundColor: "cyan",
              color: "purple",
              border: "3px outset magenta",
              padding: "10px 20px",
              cursor: "pointer",
              textShadow: "1px 1px white",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "yellow";
              e.target.style.color = "red";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "cyan";
              e.target.style.color = "purple";
            }}
          >
            Đăng Nhập
          </button>
        </form>
        <div style={{ marginTop: "20px" }}>
          <button
            style={{
              fontFamily: "'Comic Sans MS', cursive",
              fontSize: "18px",
              backgroundColor: "lime",
              color: "blue",
              border: "3px outset orange",
              padding: "8px 15px",
              cursor: "pointer",
              textShadow: "1px 1px white",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "orange";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "lime";
              e.target.style.color = "blue";
            }}
            onClick={() => navigate("/register")} // Điều hướng đến trang đăng ký
          >
            Tạo Tài Khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
