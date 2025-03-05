import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const UserPlaylist = ({playlists}) => {

    return(
        <div className="w-full h-full">
            {
                playlists && playlists.length > 0 ? (
                    <div className="bg-amber-400 w-100 h-20">
                        <ul className="text-white">
                            {
                                playlists.map((playlist) => (                                 
                                    <li className="text-white">
                                        <NavLink to={`/playlist/${playlist.playlist_id}`}>{playlist.playlist_name}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ):(
                    <div>Loading....</div>
                )
            }
        </div>
    )
}