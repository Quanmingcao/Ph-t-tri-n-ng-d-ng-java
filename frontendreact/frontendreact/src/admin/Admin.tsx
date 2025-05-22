import React, { useEffect, useState } from "react";
import AdminSongModal from "./approving";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

type User = {
  userid: number;
  name: string;
  email: string;
  role: string;
};

type Song = {
  songid: number;
  name: string;
  genre: string;
  filename: string;
  description: string;
  image: string;
  approved: boolean;
};

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"users" | "songs">("users");
  const [modalSong, setModalSong] = useState<Song | null>(null);
  // State tìm kiếm
  const [userSearch, setUserSearch] = useState("");
  const [songSearch, setSongSearch] = useState("");

  // State sửa user
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserRole, setEditUserRole] = useState("");

  // State sửa song
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [editSongName, setEditSongName] = useState("");
  const [editSongGenre, setEditSongGenre] = useState("");
  const [editSongDesc, setEditSongDesc] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const usersRes = await axios.get<User[]>(
        "http://localhost:8080/user/all"
      );
      setUsers(usersRes.data);
      const songsRes = await axios.get<Song[]>(
        "http://localhost:8080/songs/all"
      );
      setSongs(songsRes.data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const approveSong = async (songid: number) => {
    const updated = {
      ...songs.find((s) => s.songid === songid),
      approved: true,
    };
    await axios.put(`http://localhost:8080/songs/update/${songid}`, updated);
    alert("Đã duyệt bài hát");
  };

  const deleteUser = async (userid: number) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa người dùng này?")) return;
    await axios.delete(`http://localhost:8080/user/delete/${userid}`);
    setUsers((prev) => prev.filter((u) => u.userid !== userid));
  };

  const deleteSong = async (songid: number) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa bài hát này?")) return;
    await axios.delete(`http://localhost:8080/songs/delete/${songid}`);
    setSongs((prev) => prev.filter((s) => s.songid !== songid));
  };

  // Bắt đầu sửa user
  const startEditUser = (user: User) => {
    setEditingUser(user);
    setEditUserName(user.name);
    setEditUserEmail(user.email);
    setEditUserRole(user.role);
  };

  // Lưu user đã sửa
  const saveEditUser = async () => {
    if (!editingUser) return;
    await axios.put(`http://localhost:8080/user/update/${editingUser.userid}`, {
      name: editUserName,
      email: editUserEmail,
      role: editUserRole,
    });
    setUsers((prev) =>
      prev.map((u) =>
        u.userid === editingUser.userid
          ? {
              ...u,
              name: editUserName,
              email: editUserEmail,
              role: editUserRole,
            }
          : u
      )
    );
    setEditingUser(null);
  };

  // Bắt đầu sửa song
  const startEditSong = (song: Song) => {
    setEditingSong(song);
    setEditSongName(song.name);
    setEditSongGenre(song.genre);
    setEditSongDesc(song.description);
  };

  // Lưu song đã sửa
  const saveEditSong = async () => {
    if (!editingSong) return;
    await axios.put(
      `http://localhost:8080/songs/update/${editingSong.songid}`,
      {
        name: editSongName,
        genre: editSongGenre,
        description: editSongDesc,
      }
    );
    setSongs((prev) =>
      prev.map((s) =>
        s.songid === editingSong.songid
          ? {
              ...s,
              name: editSongName,
              genre: editSongGenre,
              description: editSongDesc,
            }
          : s
      )
    );
    setEditingSong(null);
  };

  // Lọc user và song theo từ khóa tìm kiếm
  const filteredUsers = users.filter(
    (u) =>
      (u.name?.toLowerCase() || "").includes(
        (userSearch || "").toLowerCase()
      ) ||
      (u.email?.toLowerCase() || "").includes((userSearch || "").toLowerCase())
  );

  const filteredSongs = songs.filter(
    (s) =>
      (s.name?.toLowerCase() || "").includes(
        (songSearch || "").toLowerCase()
      ) ||
      (s.genre?.toLowerCase() || "").includes((songSearch || "").toLowerCase())
  );
  if (loading) return <div style={{ padding: 32 }}>Đang tải dữ liệu...</div>;

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <header
        style={{
          background: "#222",
          color: "#fff",
          padding: "16px 0",
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          letterSpacing: 2,
        }}
      >
        Trang Quản Trị Hệ Thống
      </header>
      <div style={{ flex: 1, display: "flex" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 200,
            background: "#f5f5f5",
            borderRight: "2px solid #ddd",
            padding: 24,
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 24,
              color: "#3F51B5",
            }}
          >
            Chức năng
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: 10,
                  background: view === "users" ? "#e3f2fd" : "#fff",
                  border: "1px solid #90caf9",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: view === "users" ? "bold" : "normal",
                }}
                onClick={() => setView("users")}
              >
                Quản lý người dùng
              </button>
            </li>
            <li>
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  background: view === "songs" ? "#e3f2fd" : "#fff",
                  border: "1px solid #90caf9",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: view === "songs" ? "bold" : "normal",
                }}
                onClick={() => setView("songs")}
              >
                Quản lý âm thanh
              </button>
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #90caf9",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: "normal",
                  marginTop: 10,
                }}
                onClick={() => (window.location.href = "http://localhost:5173")}
              >
                Về trang chính
              </button>
            </li>
          </ul>
        </aside>
        {/* Main content */}
        <main style={{ flex: 1, padding: 32, background: "#fafafa" }}>
          {view === "users" && (
            <>
              <h2 style={{ color: "#3F51B5" }}>Quản lý người dùng</h2>
              <input
                type="text"
                placeholder="Tìm kiếm tên hoặc email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                style={{
                  marginBottom: 16,
                  padding: 8,
                  width: 300,
                  border: "1px solid #bbb",
                  borderRadius: 4,
                }}
              />
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  background: "#fff",
                  marginBottom: 32,
                }}
              >
                <thead>
                  <tr style={{ background: "#e3f2fd" }}>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>ID</th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Tên
                    </th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Email
                    </th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Role
                    </th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Sửa
                    </th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Xóa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.userid}>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        {u.userid}
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        {u.name}
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        {u.email}
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        {u.role}
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        <button
                          style={{
                            background: "#ffd600",
                            color: "#222",
                            border: "none",
                            borderRadius: 4,
                            padding: "4px 12px",
                            cursor: "pointer",
                          }}
                          onClick={() => startEditUser(u)}
                        >
                          Sửa
                        </button>
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        <button
                          style={{
                            background: "#ff5252",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            padding: "4px 12px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteUser(u.userid)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Modal sửa user */}
              {editingUser && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      padding: 32,
                      borderRadius: 8,
                      minWidth: 320,
                    }}
                  >
                    <h3>Sửa người dùng</h3>
                    <div>
                      <label>Tên:</label>
                      <input
                        value={editUserName}
                        onChange={(e) => setEditUserName(e.target.value)}
                        style={{
                          width: "100%",
                          marginBottom: 8,
                          padding: 4,
                          border: "1px solid #bbb",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input
                        value={editUserEmail}
                        onChange={(e) => setEditUserEmail(e.target.value)}
                        style={{
                          width: "100%",
                          marginBottom: 8,
                          padding: 4,
                          border: "1px solid #bbb",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <div>
                      <label>Role:</label>
                      <select
                        value={editUserRole}
                        onChange={(e) => setEditUserRole(e.target.value)}
                        style={{
                          width: "100%",
                          marginBottom: 8,
                          padding: 4,
                          border: "1px solid #bbb",
                          borderRadius: 4,
                        }}
                      >
                        <option value="user">user</option>
                        <option value="administrator">administrator</option>
                      </select>
                    </div>
                    <button
                      style={{
                        background: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 18px",
                        marginRight: 8,
                        cursor: "pointer",
                      }}
                      onClick={saveEditUser}
                    >
                      Lưu
                    </button>
                    <button
                      style={{
                        background: "#ff5252",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 18px",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingUser(null)}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {view === "songs" && (
            <>
              <h2 style={{ color: "#3F51B5" }}>Quản lý âm thanh</h2>
              <input
                type="text"
                placeholder="Tìm kiếm tên hoặc thể loại..."
                value={songSearch}
                onChange={(e) => setSongSearch(e.target.value)}
                style={{
                  marginBottom: 16,
                  padding: 8,
                  width: 300,
                  border: "1px solid #bbb",
                  borderRadius: 4,
                }}
              />
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  background: "#fff",
                }}
              >
                <thead>
                  <tr style={{ background: "#e3f2fd" }}>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>ID</th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Tên
                    </th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Thể loại
                    </th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Sửa
                    </th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Duyệt
                    </th>
                    <th style={{ border: "1px solid #bbb", padding: 8 }}>
                      Xóa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSongs.map((s) => (
                    <tr key={s.songid}>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        {s.songid}
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        {s.name}
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        {s.genre}
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        <button
                          style={{
                            background: "#ffd600",
                            color: "#222",
                            border: "none",
                            borderRadius: 4,
                            padding: "4px 12px",
                            cursor: "pointer",
                          }}
                          onClick={() => startEditSong(s)}
                        >
                          Sửa
                        </button>
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        {s.approved ? (
                          <span style={{ color: "green" }}>Đã duyệt</span>
                        ) : (
                          <button onClick={() => setModalSong(s)}>
                            Nghe thử
                          </button>
                        )}
                      </td>
                      <td style={{ border: "1px solid #bbb", padding: 8 }}>
                        <button
                          style={{
                            background: "#ff5252",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            padding: "4px 12px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteSong(s.songid)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Modal sửa song */}
              {editingSong && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      padding: 32,
                      borderRadius: 8,
                      minWidth: 320,
                    }}
                  >
                    <h3>Sửa âm thanh</h3>
                    <div>
                      <label>Tên:</label>
                      <input
                        value={editSongName}
                        onChange={(e) => setEditSongName(e.target.value)}
                        style={{
                          width: "100%",
                          marginBottom: 8,
                          padding: 4,
                          border: "1px solid #bbb",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <div>
                      <label>Thể loại:</label>
                      <input
                        value={editSongGenre}
                        onChange={(e) => setEditSongGenre(e.target.value)}
                        style={{
                          width: "100%",
                          marginBottom: 8,
                          padding: 4,
                          border: "1px solid #bbb",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <div>
                      <label>Mô tả:</label>
                      <input
                        value={editSongDesc}
                        onChange={(e) => setEditSongDesc(e.target.value)}
                        style={{
                          width: "100%",
                          marginBottom: 8,
                          padding: 4,
                          border: "1px solid #bbb",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <button
                      style={{
                        background: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 18px",
                        marginRight: 8,
                        cursor: "pointer",
                      }}
                      onClick={saveEditSong}
                    >
                      Lưu
                    </button>
                    <button
                      style={{
                        background: "#ff5252",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 18px",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingSong(null)}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      {/* Footer */}
      <footer
        style={{
          background: "#222",
          color: "#fff",
          textAlign: "center",
          padding: 12,
          fontSize: 16,
        }}
      >
        &copy; {new Date().getFullYear()} Admin Panel - Open Audio Platform
      </footer>
      {modalSong && (
        <AdminSongModal
          song={modalSong}
          open={!!modalSong}
          onClose={() => setModalSong(null)}
          onApprove={async (songid) => {
            await approveSong(songid);
            setModalSong(null);
            setSongs((prev) =>
              prev.map((s) =>
                s.songid === songid ? { ...s, approved: true } : s
              )
            );
          }}
          onDelete={async (songid) => {
            await deleteSong(songid);
            setModalSong(null);
          }}
        />
      )}
    </div>
  );
};

export default Admin;
