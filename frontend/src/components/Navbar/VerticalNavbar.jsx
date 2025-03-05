import React, { useState,useEffect } from "react";
import { NavLink, useFetcher } from "react-router-dom";
import {CreatePlaylist} from "../Playlist/CreatePlaylist.jsx";
import { UserPlaylist } from "../Playlist/UserPlaylist.jsx";
import { getUserPlaylist } from "../utility/SongManipulation.jsx";

const VerticalNavbar = () => {

  const [userPlaylists,setPlaylists] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const playlists = async() => {
    let playlist = await getUserPlaylist();
    setPlaylists(playlist);
  } 

  document.addEventListener("click",(e) => {
    if(!e.target.classList.contains("create_playlist")){
      setShowForm(false)
    }
  })

  const addPlaylist = () => {
    playlists();
    setShowForm(false); 
  };

  useEffect(() => {
    playlists()
  },[]);

  return (
    <div className="h-screen">
      <div className="w-full h-[90%] bg-black px-5">
        <div className="flex flex-col border-amber-900  ">
            <div className="flex justify-center">
                <img className="w-40 pt-5" src="/logo.svg" alt="" />
            </div>
            <div className="flex flex-col gap-5 p-5 text-start">
                <NavLink className="flex items-center px-10  text-2xl bg-amber-200 rounded">
                    <i className="ri-home-4-line text-white"></i>
                    <span className="mt-1 text-white">Home</span>
                </NavLink>
                <NavLink className="flex items-center px-10  text-2xl bg-amber-200 rounded">
                    <i className="ri-music-line text-white"></i>
                    <span className="mt-1 text-white">Music</span>
                </NavLink>

                <NavLink className="flex items-center px-10  text-2xl bg-amber-200 rounded">
                    <i className="ri-play-list-fill text-white"></i>
                    <span className="mt-1 text-white">Playlist</span>
                </NavLink>
                <NavLink className="flex items-center px-10  text-2xl bg-amber-200 rounded">
                    <i className="ri-poker-hearts-line text-white"></i>
                    <span className="mt-1 text-white">Favorite</span>
                </NavLink>
            </div>
        </div>
        <hr className="bg-amber-200" />

        <div>
          <div className="flex justify-around mt-5">
            <p className="text-white text-2xl">User Playlist</p>
            <i className="create_playlist ri-add-line text-white" onClick={() => setShowForm(true)}></i>
          </div>
          <div className="bg-indigo-400">
              <UserPlaylist playlists={userPlaylists} />
          </div>
        </div>
        <div className=" absolute top-50 z-10 left-125">
          {showForm && <CreatePlaylist addPlaylist={addPlaylist} />}
        </div>
      </div>
    </div>
  );
};

export default VerticalNavbar;