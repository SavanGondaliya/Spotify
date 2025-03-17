import React, { useState, useEffect, useRef } from "react";
import { addToQueue } from "./SongManipulation";
import { useWebPlayback } from "./WebPlayBackSDK";
import { ArtistDropDown } from "./ArtistDropDown";
import { PlaylistDropDown } from "../Playlist/PlaylistDropDown";

export const KebabDropDown = ({ playlists, artists, track_id }) => {
    const { deviceId } = useWebPlayback();
    const [artistIndex, setArtistIndex] = useState(null);
    const [playlistIndex, setPlaylistIndex] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState("left-full"); // Default to right

    const dropdownRef = useRef(null);

    useEffect(() => {
        const updatePosition = () => {
            if (dropdownRef.current) {
                const rect = dropdownRef.current.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                
                if (rect.right + 200 > windowWidth) {
                    setDropdownPosition("right-full"); // Move left if overflow
                } else {
                    setDropdownPosition("left-full"); // Default right
                }
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, []);

    return (
        <div className="relative w-100 bg-gray-800 text-white p-2 rounded-md" ref={dropdownRef}>
            
            <div 
                onClick={() => addToQueue(deviceId, track_id)}
                className="hover:cursor-pointer p-2 hover:bg-gray-700"
            >
                Add To Queue
            </div>

            <div 
                className="relative"
                onMouseEnter={() => setArtistIndex(track_id)} 
                onMouseLeave={() => setArtistIndex(null)}
            >
                <div className="hover:cursor-pointer p-2 hover:bg-gray-700">
                    Go To Artists
                </div>
                {artistIndex === track_id && (
                    <div className={`absolute top-0 ${dropdownPosition} bg-gray-900 text-white p-2 rounded-md shadow-md min-w-[150px]`}>
                        <ArtistDropDown artists={artists} />
                    </div>
                )}
            </div>

            <div 
                className="relative"
                onMouseEnter={() => setPlaylistIndex(track_id)}
                onMouseLeave={() => setPlaylistIndex(null)}
            >
                <div className="hover:cursor-pointer p-2 hover:bg-gray-700">
                    Add To Playlist
                </div>
                {playlistIndex === track_id && (
                    <div className={`absolute top-0 ${dropdownPosition} bg-gray-900 text-white p-2 rounded-md shadow-md min-w-[150px]`}>
                        <PlaylistDropDown playlists={playlists} track_id={track_id} />
                    </div>
                )}
            </div>
        </div>
    );
};
