import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play,Pause,songDuration } from "../utility/SongManipulation";
import { UserPlaylist } from "../Playlist/UserPlaylist";

export const PopulterTracks = () => {

    const session_details = sessionStorage.getItem("session_details");
    const [populerTracks,setPopulerTracks] = useState();
    const [isPlay,setIsPlay] = useState(false);
    const {player,deviceId} = useWebPlayback();
    const [positionMs,setPositionMs] = useState(0);
    const [currentState,setCurrentState] = useState(null);
    const {id} = useParams();
    
    const artistTracks = async() => {
        try {
            
            const response = await axios.get(`http://localhost:5000/artist/top-tracks/${id}?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                setPopulerTracks(response.data)
            }
        } catch (error) {
            return error
        }
    }
    
    useEffect(() => {
        artistTracks();        
    },[deviceId]);

    
    useEffect(() => {
        if (!player) return;
            player.getCurrentState().then(state => {
                if(!state){
                    return;
                }
                setCurrentState(state);
                setPositionMs(state.position)
            })
    },[isPlay]);
    
    const handleMusic = (id,type) => {
        if(isPlay == id){
            Pause(id,deviceId)
            setIsPlay(null);
        }else{
            Play(id,deviceId,type,positionMs);
            setIsPlay(id);
        }
    }
    
    return(
            populerTracks && Array(populerTracks).length > 0 ? (
                <div className="w-full h-100  bg-black overflow-y-scroll m-5">
                    <h1 className="text-white text-2xl">Populer</h1>
                    <div>
                        {
                            populerTracks.tracks.map((track) => (
                                <div className="flex items-center justify-between my-5 hover:bg-indigo-600">
                                    <div className="w-full flex justify-center items-center" onClick={() => handleMusic(track.id,"track")}>
                                        <img 
                                            className="w-15 h-15 rounded populer_image"
                                            src={track.album.images[0].url} 
                                            alt="" 
                                            />
                                    </div>
                                    <div className="w-full mx-4">
                                        <p className="highlight__text text-white">{track.name}</p>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-white">{songDuration(track.duration_ms)}</p>
                                    </div>
                                    <div className="w-full relative" onClick={() => showDropDown}>
                                        <div className="hidden dropDown absolute top-10 left-10">
                                            <UserPlaylist />
                                        </div>
                                        <i className="ri-add-line text-white"></i>
                                    </div>
                                    <div className="w-full">
                                    <i className="ri-more-2-fill text-white"></i>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ):(
                <div>
                    Loading...
                </div>
            )
    )
}

