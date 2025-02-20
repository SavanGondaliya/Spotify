import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { PlaySong,PauseSong } from "../utility/SongManipulation";

export const PopulterTracks = () => {

    const session_details = sessionStorage.getItem("session_details");
    const [populerTracks,setPopulerTracks] = useState();
    const [deviceId,setDeviceId] = useState("");
    const [play,setPlay] = useState();
    const player = useWebPlayback();
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

    const songDuration = (position) => {

        let minute = Math.floor((position/1000) / 60)
        let second = Math.floor((position/1000) % 60)
        
        return `${minute}:${second < 10 ? '0'+second : second}`

    }

    const handleMusic = (id) => {
        if(play == id){
            PauseSong(id,deviceId);
            setPlay(null)
        }else{
            PlaySong(id,deviceId);
            setPlay(id);
        }
    }

    useEffect(() => {
        
        if(!player) return;
        
        player.addListener("ready",({device_id}) => {
            setDeviceId(device_id);
        });
        
    },[player]);
    
    useEffect(() => {
        artistTracks();        
    },[deviceId]);
    
    return(
            populerTracks && Array(populerTracks).length > 0 ? (
                <div className="w-full h-100  bg-black overflow-y-scroll m-5">
                    <div>
                        {
                            populerTracks.tracks.map((track) => (
                                <div className="flex items-center justify-between my-5 hover:bg-indigo-600">
                                    <div className="w-full" onClick={(e) => handleMusic(track.id)}>
                                        <img 
                                            className="w-15 h-15 rounded"
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
                                    <div className="w-full">
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
                    Loadinng....
                </div>
            )
    )
}

