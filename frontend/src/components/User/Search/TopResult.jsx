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
            <h2 className="text-2xl mx-5 my-5">TopResult</h2>
            {
                <div className="flex flex-col rounded px-5 py-5 justify-between w-full mx-5 p-5">
                    <div className="flex ">
                        <img 
                            onClick={() => handleMusic(topResult?.id,"track")}
                            className="w-30 h-30 search_image_shadow"
                            src={topResult?.album?.images[0]?.url} 
                            alt="" 
                            srcset="" 
                            />
                        <div className="mx-10 text-4xl">
                            {topResult?.name}
                        </div>
                    </div>
                    <div className="my-2">
                        {topResult?.album?.name}
                    </div>
                    <div>
                    {topResult?.artists?.map((artist, i) => (
                        <React.Fragment key={artist?.id}>
                            <NavLink className="text-2xl" to={`http://localhost:5173/artist/${artist?.id}`}>
                                {artist?.name}
                            </NavLink>
                            {i < topResult.artists.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            }
        <style jsx>{`
                .search_image_shadow{
                    box-shadow: 8px 8px 0px #4949bf;
                }
                .__top_container__{
                    box-shadow: 8px 8px 0px #4949bf;    
                }
            `}
        </style>
        </div>

    )
}