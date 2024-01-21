import React from "react";
import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { UserConfigPage } from "./pages/UserConfigPage";
import { SearchPage } from "./pages/SearchPage.jsx";
import { ChatPage } from "./pages/ChatPage";
import { Link } from "react-router-dom";
import { NavBar } from "./pages/components/NavBar.jsx";
import { auth } from "../firebase/config.js";

function App() {
  console.log(auth?.currentUser?.email);
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "100px" }}>
        <Routes>
          <Route path="/" element={<UserConfigPage />} />
          <Route path="/user-config" element={<UserConfigPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
