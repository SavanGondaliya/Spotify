import React from "react";
import { addTrackToPlaylist } from "../utility/SongManipulation";

export const PlaylistDropDown = ({ playlists, track_id }) => {
    return (
        <div className="bg-indigo-800 p-2 rounded-md shadow-md">
            <ul>
                {playlists && playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <li 
                            key={playlist.playlist_id} 
                            className="text-white p-2 hover:bg-indigo-700 cursor-pointer"
                            onClick={() => addTrackToPlaylist(playlist.playlist_id, track_id)}
                        >
                            {playlist.playlist_name}
                        </li>
                    ))
                ) : (
                    <div>No Playlists Available</div>
                )}
            </ul>
        </div>
    );
};

/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */
