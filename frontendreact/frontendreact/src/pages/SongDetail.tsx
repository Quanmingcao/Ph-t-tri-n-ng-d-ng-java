import React, { useEffect, useState, useRef } from "react";
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

const SongDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc
  const audioRef = useRef<HTMLAudioElement | null>(null); // Tham chiếu đến audio
  const diskRef = useRef<HTMLImageElement | null>(null); // Tham chiếu đến hình ảnh

  useEffect(() => {
    axios
      .get<Song[]>("http://localhost:8080/songs/all")
      .then((response) => {
        console.log("Fetched songs:", response.data); // Kiểm tra dữ liệu trả về
        const found = response.data.find(
          (s) => s.songid === parseInt(id || "", 10)
        );
        setSong(found || null);
      })
      .catch((error) => console.error("Error fetching song:", error));
  }, [id]);

  const togglePlay = () => {
    if (!audioRef.current) {
      console.error("Audio element not found");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioPlay = () => {
    setIsPlaying(true);
  };

  const handleAudioPause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (diskRef.current) {
      if (isPlaying) {
        diskRef.current.style.animation = "spin 5s linear infinite";
      } else {
        diskRef.current.style.animation = "none";
      }
    }
  }, [isPlaying]);

  if (!song) {
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
        Loading song...
        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "100%",
        height: "80%",
        margin: "20px auto",
        padding: "12px",
        backgroundImage: "url('/images/bgss.jpg')",
        fontFamily: "'Comic Sans MS', cursive",
        color: "cyan",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          ref={diskRef} // Tham chiếu đến hình ảnh
          src="/images/Disk.png"
          alt={song.name}
          style={{
            width: "40%",
            height: "auto",
            objectFit: "fill",
            marginBottom: "5px",
            cursor: "pointer",
          }}
          onClick={togglePlay} // Xử lý click để phát/dừng nhạc
        />
      </div>
      <h1
        style={{
          fontSize: "28px",
          color: "yellow",
          textShadow: "3px 3px red",
          marginBottom: "10px",
          animation: "blink 1.5s step-end infinite",
        }}
      >
        <Link to={`/songs/${song.songid}`}>{song.name}</Link>
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "white",
          backgroundColor: "rgba(255, 0, 255, 0.3)",
          padding: "10px",
          border: "3px inset aqua",
          marginBottom: "15px",
        }}
      >
        {song.description}
      </p>
      <p
        style={{
          fontSize: "14px",
          color: "lime",
          textShadow: "1px 1px purple",
          marginBottom: "20px",
        }}
      >
        Thể loại: {song.genre}
      </p>
      <audio
        ref={audioRef} // Tham chiếu đến audio
        controls
        style={{
          width: "100%",
          border: "3px outset hotpink",
          backgroundColor: "yellow",
          cursor:
            "url('https://cur.cursors-4u.net/cursors/cur-9/cur817.cur'), auto",
        }}
        onPlay={handleAudioPlay} // Xử lý khi audio bắt đầu phát
        onPause={handleAudioPause} // Xử lý khi audio dừng
      >
        <source src={`/audio/${song.filename}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default SongDetail;
