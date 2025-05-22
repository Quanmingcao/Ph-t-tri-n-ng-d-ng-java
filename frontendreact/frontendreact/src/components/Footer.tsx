import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [hover, setHover] = useState(false);

  return (
    <footer
      style={{
        backgroundImage: "url('/images/bgss.jpg')",
        padding: "15px",
        textAlign: "center",
        fontFamily: "Comic Sans MS, cursive",
        color: "yellow",

        transition: "opacity 0.5s",
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <hr
        style={{
          border: "none",
          height: "5px",
          backgroundImage:
            "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
          opacity: 0.2,
        }}
      />
      <p
        style={{
          fontSize: "16px",
          color: "cyan",
          textShadow: "2px 2px magenta",
          animation: "blink 1.5s step-end infinite",
          opacity: 0.7,
        }}
      >
        © 2025 MusicApp - All Rights Reserved!!!
      </p>
      {user && user.role === "administrator" && (
        <button
          style={{
            marginTop: 12,
            padding: "8px 24px",
            background: "magenta",
            color: "yellow",
            border: "2px solid cyan",
            borderRadius: 8,
            fontFamily: "Comic Sans MS, cursive",
            fontSize: 18,
            cursor: "pointer",
            textShadow: "2px 2px blue",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.5s",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 20,
            zIndex: 2,
          }}
          onClick={() => navigate("/admin")}
        >
          Bấm đi!
        </button>
      )}
      <div style={{ marginTop: "10px" }}></div>
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
