import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      style={{
        backgroundImage:
          "url('https://www.textures.com/system/gallery/photos/Backgrounds/Stars/139287/preview/Stars0004_1_350.jpg')",
        width: "200px",
        height: "100%",
        padding: "10px",
        border: "4px outset fuchsia",
        boxShadow: "0 0 0 4px lime",
        fontFamily: "Comic Sans MS, cursive",
        color: "yellow",
        textAlign: "center",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {["Songs", "Playlists", "Favorites", "Upload Music"].map((item) => (
          <li
            key={item}
            style={{
              margin: "10px 0",
              fontSize: "18px",
              color: "cyan",
              textShadow: "2px 2px magenta",
              cursor:
                "url('https://cur.cursors-4u.net/cursors/cur-9/cur817.cur'), auto",
              backgroundColor: "rgba(255, 0, 255, 0.3)",
              padding: "5px",
              border: "2px inset aqua",
            }}
          >
            {item === "Songs" ||
            item === "Playlists" ||
            item === "Favorites" ||
            item === "Upload Music" ? (
              <Link
                to={
                  item === "Songs"
                    ? "/"
                    : item === "Playlists"
                    ? "/playlistlist"
                    : item === "Favorites"
                    ? "/favoritelist"
                    : "/uploadmusic"
                }
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {item}
              </Link>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px" }}></div>
    </aside>
  );
};

export default Sidebar;
