import React from "react";
import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { UserConfigPage } from "./pages/UserConfigPage";
import { SearchPage } from "./pages/SearchPage.jsx";
import { ChatPage } from "./pages/ChatPage";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  /*
  Login
  User Setup
  Search Page
  - filter
  - profile popups
  Chat Page
  */
  return (
    <>
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-config" element={<UserConfigPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
  
      <div>
        <div>Home Page</div>
        <Link to="/user-config">Go to User Config</Link>
      </div>
    </>
  );
}

export default App;
