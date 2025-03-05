import React,{useState,useEffect} from "react";
import { Play,Pause } from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";

export const Tracks = (tracks) => {

    
    const [isPlay,setIsPlay] = useState(false);
    const {player,deviceId}  =  useWebPlayback();  
    const [positionMs,setPositionMs]  =  useState(0);
    
    useEffect(() => {
        if (!player) return;
            player.getCurrentState().then((state) => {
                if (!state) {
                    return;
                }                
                setPositionMs(state.position);
            });
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
        
    return (
        <div>
            {
                tracks  ? (
                    <div className="w-[100%] h-[100%] ">
                        {
                            tracks.tracks.map((track) => (
                                <div>
                                    {
                                        <div className="w-full">
                                            <div className="w-full" onClick={() => handleMusic(track.id,"track")}>
                                                <img  className="w-20 h-20" src={track.album.images[0].url} alt="" />
                                                <h1 className="text-amber-50">{track.name}</h1>
                                            </div>
                                        </div>
                                    }           
                                </div>
                            ))
                        }
                    </div>
                ):(
                    <div>
                        Loading...
                    </div>
                )
            }
        </div>
    )
}