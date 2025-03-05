import React from "react";
import { useState,useEffect,useRef } from "react";
import "./style.css";
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

const HorizontalNavbar = () => {

  const {q} = useParams();
  const [searchQuery, setSearchQuery] = useState(q);
  const navigate  = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("session_details");
    window.location.href = "/"
  }

  const updateSearch = debounce(() => {
    if(searchQuery.length > 0){
      navigate(`/search/${encodeURIComponent(searchQuery)}`)
    }
  },5);
  
  return (
    <div className="">
      <div className="flex justify-around items-center bg-black w-full p-10 h-10">
        <div className="search-bar text-amber-200">
            <input 
              type="text"
              placeholder="Search your favorites"
              id="search-input"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value),updateSearch(e.target.value)}}
            />
            <button className="search-btn" id="search-btn">
              <i className="ri-search-line"></i>
            </button>
        </div>
        <div className="text-white cursor-pointer" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default HorizontalNavbar;
