import React from "react";
import { useState } from "react";
import "./style.css";

const HorizontalNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const logout = () => {
    sessionStorage.removeItem("session_details");
    window.location.href = "/"
  }


  return (
    <div>
      <div className="flex justify-around items-center bg-black w-full p-10 h-10">
        <div className="flex justify-center items-center">
          <input
            className="bg-gray-900 w-70 rounded p-2 shadow_input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-135">
            <i className="   text-white ri-search-line"></i>
          </span>
        </div>
        <div className="text-white cursor-pointer" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
};
export default HorizontalNavbar;
