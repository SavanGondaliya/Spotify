import React from "react";
import { useState, useEffect } from "react";
import MusicLoader from "../utility/Loader";
import { PlaylistBase64 } from "../Playlist/icon/Playlist";
import Wave from "../../Animations/Wave.jsx";

export const Profile = ({ userDetails }) => {
  return (
    <div className=" flex w-full h-70 justify-center p-4 ">
      {Array.isArray(userDetails) && userDetails.length > 0 ? (
        userDetails.map((user) => (
          <div
            key={user?.user_id}
            className="relative w-[80%] p-6 rounded-lg flex flex-col sm:flex-row items-center gap-6 overflow-hidden  __profile_container__"
          >
            <div className="w-30 h-30 rounded overflow-hidden z-20 bg-[#f2c178] __profile_image__">
              <img
                src="/public/tushar_logo.png"
                alt="C:\Users\hp\OneDrive\Pictures\Screenshots\tushar_logo.png"
                className="w-full h-full object-cover"
              />
              {/* <div className="w-full h-full  flex justify-center items-center">
                <i className="text-6xl ri-user-fill text-black"></i>
              </div> */}
            </div>
            <div className="text-center sm:text-left z-20 ">
              <p className="text-gray-300">Profile</p>
              <h1 className="text-4xl font-bold text-[#f2c178] ">
                {user?.name}
              </h1>
              <p className="text-sm text-gray-200">
                {user?.totalPlaylist} Public Playlists
              </p>
            </div>
            <div className="absolute scale-125 z-[0] rotate-350">
              <Wave />
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <MusicLoader />
        </div>
      )}

      <style>
        {`
          .__profile_container__ {
            background-color: #282870;
          }
          .__profile_image__{
            box-shadow: 5px 5px 0px #935d07;
          }
        `}
      </style>
    </div>
  );
};
/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */
