import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SongList from "./pages/SongsList";
import SongDetail from "./pages/SongDetail";
import PlaylistList from "./pages/PlaylistList";
import PlaylistDetail from "./pages/PlaylistDetail"; // Import PlaylistDetail
import Login from "./pages/Login"; // Import Login
import Register from "./pages/Register"; // Import Register
import FavoriteList from "./pages/FavoriteList";
import UploadMusic from "./pages/Upload";
import Admin from "./admin/Admin";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        {/* Layout bao quanh cả SongList và SongDetail */}
        <Route path="/" element={<Layout />}>
          <Route index element={<SongList />} />
          <Route path="playlistlist" element={<PlaylistList />} />
          <Route path="songs/:id" element={<SongDetail />} />
          <Route path="playlists/:id" element={<PlaylistDetail />} />{" "}
          <Route path="favoritelist" element={<FavoriteList />} />
          <Route path="uploadmusic" element={<UploadMusic />} />
          {/* Route mới */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
