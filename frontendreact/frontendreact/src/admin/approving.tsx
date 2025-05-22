import React, { useRef, useEffect, useState } from "react";

type Song = {
  songid: number;
  name: string;
  description: string;
  image: string;
  filename: string;
  genre: string;
};

type AdminSongModalProps = {
  song: Song;
  open: boolean;
  onClose: () => void;
  onApprove: (songid: number) => void;
  onDelete: (songid: number) => void;
};

const AdminSongModal: React.FC<AdminSongModalProps> = ({
  song,
  open,
  onClose,
  onApprove,
  onDelete,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!open && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#222",
          color: "#fff",
          padding: 32,
          borderRadius: 12,
          minWidth: 350,
          maxWidth: 500,
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: "yellow", marginBottom: 8 }}>{song.name}</h2>
        <p style={{ color: "#ccc", marginBottom: 8 }}>{song.description}</p>
        <p style={{ color: "#8ff", marginBottom: 8 }}>Thể loại: {song.genre}</p>
        <audio
          ref={audioRef}
          controls
          style={{ width: "100%", marginBottom: 16 }}
          src={`/audio/${song.filename}`}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button
            style={{
              background: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 20px",
              cursor: "pointer",
            }}
            onClick={() => onApprove(song.songid)}
          >
            Duyệt
          </button>
          <button
            style={{
              background: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 20px",
              cursor: "pointer",
            }}
            onClick={() => onDelete(song.songid)}
          >
            Xóa
          </button>
          <button
            style={{
              background: "#888",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 20px",
              marginLeft: "auto",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSongModal;
