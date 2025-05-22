import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

const Layout = () => {
  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive",
        backgroundImage:
          "url('https://www.textures.com/system/gallery/photos/Backgrounds/Patterns/139289/preview/Patterns0013_1_350.jpg')",
        color: "yellow",
        textShadow: "1px 1px magenta",
        minHeight: "100vh",
        border: "4px outset purple",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          width: "100%",
          backgroundImage: "url('/images/bgss.jpg')",
        }}
      >
        {/* Sidebar */}
        <div style={{ width: "200px", flexShrink: 0 }}>
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main
          style={{
            flexGrow: 1,
            padding: "15px",
            backgroundImage:
              "url('https://www.textures.com/system/gallery/photos/Backgrounds/Stars/139287/preview/Stars0004_1_350.jpg')",
            borderLeft: "4px outset lime",
            minHeight: "calc(100vh - 150px)", // Adjust for header/footer
          }}
        >
          {/* Hiển thị nội dung của route con */}
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
      <div
        style={{
          textAlign: "center",
          backgroundImage: "url('/images/bgss.jpg')",
          padding: "8px",
        }}
      >
        <marquee style={{ color: "cyan", fontSize: "12px" }}>
          Best viewed in Netscape Navigator at 800x600 resolution!!!
        </marquee>
      </div>
    </div>
  );
};

export default Layout;
