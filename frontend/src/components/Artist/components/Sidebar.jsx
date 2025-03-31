import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"));

  return (
    <div className="w-60 h-full bg-[#0c0925] shadow-md shadow-[#f2c178] flex flex-col p-5">
      {/* Logo */}
      <img src="/Noizee_For_Artists.svg" className="w-20 mx-auto mb-6" alt="Noizee" />

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/artist/dashboard"
          className={({ isActive }) =>
            `flex items-center px-5 py-2 rounded-md font-semibold text-white text-lg transition ${
              isActive ? "bg-[#282870] text-[#ffba53] shadow-md shadow-[#935d07]" : "hover:bg-[#333157]"
            }`
          }
        >
          <i className="ri-user-6-line text-xl mr-3"></i> ARTISTS
        </NavLink>

        {artistDetails && artistDetails[0] && (
          <NavLink
            to={`/${artistDetails[0]?.artist_id}/albums`}
            className={({ isActive }) =>
              `flex items-center px-5 py-2 rounded-md font-semibold text-white text-lg transition ${
                isActive ? "bg-[#282870] text-[#ffba53] shadow-md shadow-[#935d07]" : "hover:bg-[#333157]"
              }`
            }
          >
            <i className="ri-music-line text-xl mr-3"></i> Albums
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
