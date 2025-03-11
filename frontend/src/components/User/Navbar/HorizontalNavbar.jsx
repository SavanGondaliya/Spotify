import React from "react";
import { useState, useEffect, useRef } from "react";
import "./style.css";
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

const HorizontalNavbar = () => {
  const { q } = useParams();
  const [searchQuery, setSearchQuery] = useState(q);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("session_details");
    window.location.href = "/";
  };

  const updateSearch = debounce(() => {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
  }, 500);

  return (
    <div className="horizontal_navbar">
      <nav class="navbar">
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search your favorites"
            id="search-input"
            onChange={(e) => {setSearchQuery(e.target.value),updateSearch()}}
          />
          <button class="search-btn" id="search-btn">
            <i class="ri-search-line"></i>
          </button>
        </div>
        <div class="auth">
          <a href="#" class="auth-link" onClick={logout}>
            LOGIN/SIGN IN
          </a>
          <div class="profile-icon"></div>
        </div>
      </nav>
    </div>
  );
};

export default HorizontalNavbar;
