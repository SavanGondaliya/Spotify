import React,{useState,useEffect} from "react";
import { Play,Pause } from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { getReportData } from "../utility/SongManipulation";
import { songDuration } from "../utility/SongManipulation";

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
            getReportData(state.position,state.track_window.current_track.name,state.track_window.current_track.artists[0].name);
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
                            tracks.tracks.map((track,i) => (
                                <div>
                                    {   i > 0 && i < 6 ? (
                                        <div className="w-full flex flex-col">
                                            <div className="w-full flex my-2 justify-center items-center">
                                                <div className="w-full player_image">
                                                    <img onClick={() => handleMusic(track?.id,"track")}  className="w-15 h-15" src={track?.album?.images[0]?.url} alt="" />
                                                </div>
                                                <div className="w-full">
                                                    <h1 className="text-amber-50">{track?.name}</h1>
                                                </div>
                                                <div className="w-full">
                                                    <b>{songDuration(track?.duration_ms)}</b>
                                                </div>
                                            </div>
                                        </div>
                                        ) :(
                                            <div></div>
                                        )
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