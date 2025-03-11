import React, { useRef, useState } from "react";
import { addToQueue } from "./SongManipulation";
import { useWebPlayback } from "./WebPlayBackSDK";
import { ArtistDropDown } from "./ArtistDropDown";
import { PlaylistDropDown } from "../Playlist/PlaylistDropDown";


export const KebabDropDown = ({playlists,artists,track_id}) => {
    
    const {player,deviceId} = useWebPlayback();

    const artistRef = useRef();
    const playlistRef = useRef();
    const [position,setPosition] = useState({bottom:0, right:0});
    const [artistIndex,setArtistIndex] =useState();
    const [playlistIndex,setPlaylistIndex] = useState();
    const [index,setIndex] = useState(1);

    const handleArtistDropDown = (track_id) => {
        if(artistRef.current){
            const rect = artistRef.current.getBoundingClientRect();
            setPosition({bottom: 50,right: 40})
        }
        setArtistIndex((prev) => prev === track_id ? null : track_id)
    }

    
    const handlePlaylistDropDown = (track_id) => {
        if(playlistRef.current){
            const rect = playlistRef.current.getBoundingClientRect();
            setPosition({bottom: rect.bottom,right: rect.right})
        }
        setPlaylistIndex((prev) => prev === track_id ? null : track_id)
    }


    return(
        <div className="w-100">  
            <div 
                onClick={() => addToQueue(deviceId,track_id)}
                className="hover:cursor-pointer"
            >
                Add To Queue
            </div>
            <div>    
                <div 
                    ref={artistRef} onMouseOver={() => handleArtistDropDown(index)} 
                    className="z-10 hover:cursor-pointer"  
                    style={{ bottom: position.bottom, right: position.right }}
                >
                Go To Artists
                    <div className="absolute text-white"> 
                        {artistIndex === index && <ArtistDropDown artists={artists} /> }
                    </div>
                </div>
            </div>
            <div>
                
            <div ref={playlistRef} onMouseOver={() => handlePlaylistDropDown(index)} className="z-10"  style={{ bottom: position.bottom, right: position.right }}>
                Add To playlist
                    <div className="absolute text-white hover:cursor-pointer"> 
                        {playlistIndex === index && <PlaylistDropDown playlists={playlists} /> }
                    </div>
                </div>
            </div>
        </div>
    )
}