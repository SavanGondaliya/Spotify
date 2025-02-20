import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const VerticalNavbar = () => {

  const session_details = sessionStorage.getItem("session_details")
  console.log(session_details);
  
  const [userPlaylist,setUserPlaylist] = useState([]);

  useEffect(() => {

    const getUserPlaylist = async() => {
      try {
        const response = await axios.get(`http://localhost:5000/playlist/user?session_details=${session_details}`,{
          headers:{
            "Content-Type" : "application/json"
          }
        });
        if(response.status === 200){
          console.log(response.data);
          const playlists = response.data;
          setUserPlaylist(playlists)
        }
      } catch (error) {
        return error
      }
    }
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
            <i className="ri-add-line text-white"></i>
          </div>
            <h1 className="text-amber-100 text-center">No Playlist</h1>
        </div>
      </div>
    </div>
  );
};

export default VerticalNavbar;
