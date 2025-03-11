import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const UserPlaylist = ({playlists}) => {

    return(
        <div className="w-full h-full">
            {
                playlists && playlists.length > 0 ? (
                    <div>
                        <div>
                        {
                            playlists.map((playlist) => (                                 
                                <NavLink to={`/playlist/${playlist.playlist_id}`} className=" playlist-item">
                                    <div className="icon">{playlist?.image}</div>
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
                    <div>Loading....</div>
                )
            }
        </div>
    )
}