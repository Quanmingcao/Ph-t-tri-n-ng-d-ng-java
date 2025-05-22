import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState(""); // Tên người dùng
  const [password, setPassword] = useState(""); // Mật khẩu
  const [confirmPassword, setConfirmPassword] = useState(""); // Nhập lại mật khẩu
  const [message, setMessage] = useState<string | null>(null); // Thông báo
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu nhập lại
    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp! Vui lòng thử lại.");
      return;
    }

    try {
      // Gửi yêu cầu tạo tài khoản đến API
      const response = await axios.post("http://localhost:8080/user/add", {
        name: username,
        password: password,
      });

      if (response.status === 200) {
        setMessage("Tạo tài khoản thành công! Đang chuyển hướng...");
        setTimeout(() => navigate("/login"), 2000); // Chuyển hướng đến trang đăng nhập sau 2 giây
      }
    } catch (err) {
      setMessage("Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại.");
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
          backgroundColor: "white", // Màu nền của box đăng ký
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
          Tạo Tài Khoản
        </h1>
        <form onSubmit={handleRegister}>
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
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "20px",
                color: "blue",
                textShadow: "1px 1px white",
              }}
            >
              Nhập lại mật khẩu:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Tạo Tài Khoản
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
