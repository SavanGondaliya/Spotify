import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PlaylistBase64 } from "./icon/Playlist";
import MusicLoader from "../utility/Loader";



export const UserPlaylist = ({playlists}) => {

    useEffect(() => {
        console.log("playlists :: ",playlists);
        
    },[playlists])
    console.log("playlists :: ",playlists);
    
    return(
        <div className="w-full h-full">
            {
                playlists && playlists.length > 0 ? (
                    <div>
                        <div>
                        {
                            playlists.map((playlist) => (                                 
                                <NavLink to={`http://localhost:5173/playlist/${playlist.playlist_id}`} className="playlist-item">
                                    <div className="icon">
                                        <img src={playlist?.image ? (playlist?.image):(PlaylistBase64)} />
                                    </div>
                                    <div className="text">
                                        <span>
                                            <h3 >{playlist.playlist_name}</h3>
                                        </span>
                                    </div>
                                </NavLink>
                            ))
                        }
                        </div>
                    </div>
                ):(
                    <div>
                        <MusicLoader />
                    </div>
                )
            }
        </div>
    )
}