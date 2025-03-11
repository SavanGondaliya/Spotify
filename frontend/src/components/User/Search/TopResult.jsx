import React from "react";
import { NavLink } from "react-router-dom";
import { Play,Pause } from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { useState,useEffect } from "react";

export const TopResult = ({topResult}) => {
    
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
                <div className="flex flex-col justify-between w-full mx-5 p-5">
                    <div>
                        <img 
                        onClick={() => handleMusic(topResult?.id,"track")}
                            className="w-30 h-30"
                            src={topResult?.album?.images[0]?.url} 
                            alt="" 
                            srcset="" 
                            />
                    </div>
                    <div>
                        {topResult?.name}
                    </div>
                    <div>
                        {topResult?.type}
                    </div>
                    <div>
                    {topResult?.artists?.map((artist, i) => (
                        <React.Fragment key={artist?.id}>
                            <NavLink to={`http://localhost:5173/artist/${artist?.id}`}>
                                {artist?.name}
                            </NavLink>
                            {i < topResult.artists.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            }
        </div>
    )
}