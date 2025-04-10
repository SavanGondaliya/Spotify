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
    window.location.href = "/auth/user";
  };

  const updateSearch = debounce(() => {
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  }, 500);

  return (
    <div className="__navbar__ w-full  py-3 px-6 shadow-md">
      <nav className="flex justify-between items-center">
        
        <div className="__search__ flex items-center gap-2 bg-black px-4 py-2 rounded w-[40%]">
          <input
            type="text"
            placeholder="Search your favorites..."
            className="bg-transparent text-white outline-none w-full "
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateSearch();
            }}
          />
          <button className="text-white">
            <i className="ri-search-line text-lg"></i>
          </button>
        </div>

        
        <div className="flex items-center gap-6">
          <NavLink
            to={`/auth/user`}
            className="text-white font-medium hover:text-indigo-400 transition"
            onClick={logout}
          >
            LOGIN/SIGN IN
          </NavLink>
          <NavLink to={`/user/${session_details?.user_id}`}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center __profile_icon__">
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
            box-shadow:5px 5px 0px 0px #4949bf;
            background-color: #303030;
          }
            .__profile_icon__{
              background-color: #f2c178;
              box-shadow: 3px 3px 0px 0px #935d07;
            }
        `
        }
      </style>
    </div>
  );
};

export default HorizontalNavbar;
