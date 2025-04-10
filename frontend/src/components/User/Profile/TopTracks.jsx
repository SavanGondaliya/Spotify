import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import MusicLoader from "../utility/Loader";
import { NavLink } from "react-router-dom";
import {Play,Pause,songDuration} from "../utility/SongManipulation"

const UserTopTracks = () => {

    const [topTrackIds,setTopTrackIds] = useState();
    const [topTrack,setTopTrack] = useState();
    const session_details = sessionStorage.getItem("session_details");

    const getTopTracksIds = () => {
        try {
            axios.get(`http://localhost:5000/user/topTracks?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setTopTrackIds(res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            return error;
        }
    }
    
    const getTopTracks = () => {
        try {
            const url = `http://localhost:5000/tracks?ids=${topTrackIds.map((track) => track[0]).join(",")}&session_details=${session_details}`
            console.log(url);
            
            axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setTopTrack(res.data)
                }
            }).catch((error) => {
                console.log(error);
                
            })

        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        getTopTracksIds();
    },[]);
    
    useEffect(() => {
      if(topTrackIds){

        getTopTracks();
      }
    },[topTrackIds])

    return(
        <div>
            {topTrack && topTrack?.tracks?.length > 0 ? (
                    topTrack?.tracks?.map((track, index) => (
                      <div
                        key={track.id}
                        className="w-full flex items-center justify-between p-3 _favourite_row_ cursor-pointer  transition rounded-lg"
                      >
                        <div className="relative w-16 h-16">
                          {/* Track Image */}
                          <img
                            className="w-full h-full rounded-md object-cover __music_image__"
                            src={track?.album?.images[0]?.url}
                            alt={track?.name}
                          />
                        </div>

                        <div className="flex flex-col w-1/3 px-4">
                          <h1 className="text-white text-lg font-semibold truncate">
                            {track?.name}
                          </h1>
                          <p className="text-gray-400 text-sm truncate">
                            {track?.artists?.map((artist, i) => (
                              <React.Fragment key={artist?.id}>
                                <NavLink
                                  to={`/artist/${artist?.id}`}
                                  className="hover:underline"
                                >
                                  {artist?.name}
                                </NavLink>
                                {i < track.artists.length - 1 && ", "}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>

                        {/* Album Name */}
                        <NavLink
                          to={`http://localhost:5173/album/${track?.album?.id}`}
                          className="w-1/4 px-4"
                        >
                          <h1 className="text-gray-300 text-sm truncate">
                            {track?.album?.name}
                          </h1>
                        </NavLink>

                        {/* Duration */}
                        <div className="w-1/6 text-center">
                          <b className="text-white">
                            {songDuration(track?.duration_ms)}
                          </b>
                        </div>
                      </div>
                    ))
                  ) : (
                    <MusicLoader />
                  )}
                  <style>
                    {
                      `
                        .__music_image__{
                          box-shadow : 5px 5px 0px 0px #4949bf;
                        }
                      `
                    }
                  </style>
        </div>
    )
}
/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */
export default UserTopTracks;