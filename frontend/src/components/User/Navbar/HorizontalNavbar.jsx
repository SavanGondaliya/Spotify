// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import "./style.css";
// import { debounce } from "lodash";
// import { NavLink, useNavigate, useParams } from "react-router-dom";

// const HorizontalNavbar = () => {
//   const session_details = JSON.parse(sessionStorage.getItem("session_details"));
//   const { q } = useParams();
//   const [searchQuery, setSearchQuery] = useState(q);
//   const navigate = useNavigate();

//   const logout = () => {
//     sessionStorage.removeItem("session_details");
//     window.location.href = "/";
//   };

//   const updateSearch = debounce(() => {
//     navigate(`/search/${encodeURIComponent(searchQuery)}`);
//   }, 500);

//   return (
//     <div className="horizontal_navbar">
//       <nav className="navbar">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search your favorites"
//             id="search-input"
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               updateSearch();
//             }}
//           />
//           <button className="search-btn" id="search-btn">
//             <i className="ri-search-line"></i>
//           </button>
//         </div>
//         <div className="auth">
//           <a href="#" className="auth-link" onClick={logout}>
//             LOGIN/SIGN IN
//           </a>
//           <NavLink to={`/user/${session_details?.user_id}`}>
//             <div className="profile-icon"></div>
//           </NavLink>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default HorizontalNavbar;
import React, { useState } from "react";
import { debounce } from "lodash";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const HorizontalNavbar = () => {
  const session_details = JSON.parse(sessionStorage.getItem("session_details"));
  const { q } = useParams();
  const [searchQuery, setSearchQuery] = useState(q || "");
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("session_details");
    window.location.href = "/";
  };

  const updateSearch = debounce(() => {
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  }, 500);

  return (
    <div className="__navbar__ w-full  py-3 px-6 shadow-md">
      <nav className="flex justify-between items-center">
        {/* Search Bar */}
        <div className="__search__ flex items-center gap-2 bg-black px-4 py-2 rounded-lg w-[40%]">
          <input
            type="text"
            placeholder="Search your favorites..."
            className="bg-transparent text-white outline-none w-full"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateSearch();
            }}
          />
          <button className="text-white">
            <i className="ri-search-line text-lg"></i>
          </button>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-white font-medium hover:text-indigo-400 transition"
            onClick={logout}
          >
            LOGIN/SIGN IN
          </a>
          <NavLink to={`/user/${session_details?.user_id}`}>
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-white text-xl"></i>
            </div>
          </NavLink>
        </div>
      </nav>
      <style jsx>{
        `
          .__navbar__{
            background-color: #0c0925;
          }
          .__search__{
            box-shadow:10px 10px 0px 0px #0c0925;
          }
        `
        }
      </style>
    </div>
  );
};

export default HorizontalNavbar;


// import React, { useState, useEffect } from "react";
// import { debounce } from "lodash";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import "./style.css";

// const HorizontalNavbar = () => {
//   const session_details = JSON.parse(sessionStorage.getItem("session_details"));
//   const { q } = useParams();
//   const [searchQuery, setSearchQuery] = useState(q);
//   const navigate = useNavigate();

//   const logout = () => {
//     sessionStorage.removeItem("session_details");
//     window.location.href = "/";
//   };

//   const updateSearch = debounce(() => {
//     navigate(`/search/${encodeURIComponent(searchQuery)}`);
//   }, 500);

//   return (
//     <div className="horizontal_navbar">
//       <nav className="navbar">
//         {/* Search Bar */}
//         <div className="search-bar flex items-center w-[60%] px-4 py-2 bg-gray-800 rounded-md">
//           <input
//             type="text"
//             placeholder="Search your favorites"
//             id="search-input"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               updateSearch();
//             }}
//             className="w-full px-3 py-2 bg-transparent text-white border border-gray-600 rounded-md"
//           />
//           <button className="search-btn ml-2 p-2 bg-indigo-500 text-white rounded-md">
//             <i className="ri-search-line"></i>
//           </button>
//         </div>

//         {/* Authentication / Profile */}
//         <div className="auth flex items-center space-x-4">
//           {/* Logout Link */}
//           <a href="#" className="auth-link text-white" onClick={logout}>
//             LOGIN/SIGN IN
//           </a>

//           {/* Profile Icon */}
//           <NavLink to={`/user/${session_details?.user_id}`}>
//             <div className="profile-icon w-10 h-10 bg-gray-700 rounded-full"></div>
//           </NavLink>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default HorizontalNavbar;
