import React, { useState } from "react";
import axios from "axios";

const UploadMusic: React.FC = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [fileMp3, setFileMp3] = useState<File | null>(null);
  const [fileImg, setFileImg] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Upload file lên backend và trả về tên file đã lưu
  const uploadFile = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const res = await axios.post(
      "http://localhost:8080/songs/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data.filename; // backend trả về tên file đã lưu
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !genre || !description || !fileMp3 || !fileImg) {
      setMessage("Vui lòng nhập đầy đủ thông tin và chọn file!");
      return;
    }
    try {
      // Upload file mp3 vào audio
      const filename = await uploadFile(fileMp3, "audio");
      // Upload file ảnh vào images
      const image = await uploadFile(fileImg, "images");

      // Gửi thông tin bài hát lên backend
      await axios.post("http://localhost:8080/songs/add", {
        name,
        genre,
        description,
        filename,
        image,
      });

      setMessage("Tải lên thành công!");
      setName("");
      setGenre("");
      setDescription("");
      setFileMp3(null);
      setFileImg(null);
      // Reset input file
      (document.getElementById("mp3input") as HTMLInputElement).value = "";
      (document.getElementById("imginput") as HTMLInputElement).value = "";
    } catch (error: any) {
      console.error("Lỗi upload:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage("Tải lên thất bại: " + error.response.data.message);
      } else if (error.message) {
        setMessage("Tải lên thất bại: " + error.message);
      } else {
        setMessage("Tải lên thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center", color: "#3F51B5" }}>
        Tải Lên Âm Thanh Của Bạn
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên âm thanh:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              border: "1px solid #3F51B5",
              borderRadius: 4,
              marginBottom: 8,
              padding: 4,
            }}
          />
        </div>
        <div>
          <label>Thể loại:</label>
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            style={{
              width: "100%",
              border: "1px solid #3F51B5",
              borderRadius: 4,
              marginBottom: 8,
              padding: 4,
            }}
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid #3F51B5",
              borderRadius: 4,
              marginBottom: 8,
              padding: 4,
            }}
          />
        </div>
        <div>
          <label>Chọn file âm thanh (mp3):</label>
          <input
            id="mp3input"
            type="file"
            accept=".mp3"
            onChange={(e) => setFileMp3(e.target.files?.[0] || null)}
            style={{ width: "100%", marginBottom: 8 }}
            required
          />
        </div>
        <div>
          <label>Chọn file ảnh:</label>
          <input
            id="imginput"
            type="file"
            accept="image/*"
            onChange={(e) => setFileImg(e.target.files?.[0] || null)}
            style={{ width: "100%", marginBottom: 8 }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: 16,
            width: "100%",
            padding: 8,
            background: "#3F51B5",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          Upload
        </button>
      </form>
      {message && (
        <div style={{ marginTop: 16, color: "green", textAlign: "center" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadMusic;
