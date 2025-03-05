import React, { useState } from "react";
import { addTrackToPlaylist } from "../utility/SongManipulation";

export const PlaylistDropDown = ({playlists,track_id}) => {

    return(
        <div>
            <div className="w-[100]% h-[100]% p-5 rounded-2xl bg-amber-300">
                <ul className="">
                    {
                        playlists && playlists.length > 0 ? (
                            playlists.map((playlist) => (
                                <li className="text-2xl hover:bg-amber-50" onClick={() => addTrackToPlaylist(playlist.playlist_id,track_id)}>{playlist.playlist_name}</li>
                            ))        
                        ):(
                            <div></div>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}