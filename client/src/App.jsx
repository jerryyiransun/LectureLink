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

function App() {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "100px" }}>
        <Routes className="">
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-config" element={<UserConfigPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
