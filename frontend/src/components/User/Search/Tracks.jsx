import React,{useState,useEffect} from "react";
import { Play,Pause } from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { songDuration } from "../utility/SongManipulation";
import { NavLink } from "react-router-dom";

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
            localStorage.setItem("player_details", JSON.stringify(state));
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

    return (<div className="w-full p-4">
        {tracks ? (
           <div className="w-full space-y-4">
           {tracks.tracks.map((track, i) => (
               i > 0 && i < 6 && (
                   <div 
                       key={track.id} 
                       className="flex items-center justify-between rounded-lg p-4 transition cursor-pointer"
                   >
                       <div className="w-16 h-16 overflow-hidden search_image_shadow">
                           <img 
                               onClick={() => handleMusic(track?.id, "track")} 
                               className="w-full h-full object-cover" 
                               src={track?.album?.images[0]?.url} 
                               alt={track?.name} 
                           />
                       </div>
       
                       <div className="flex-1 ml-4">
                           <h1 className="text-white text-lg font-semibold">{track?.name}</h1>
                           <p className="text-sm">{track?.album?.name}</p>
                       </div>
       
                       <div className="flex-1 gap-x-2 text-gray-300 text-sm">
                           {track?.artists?.map((artist, i) => (
                               <React.Fragment key={artist?.id}>
                                   <NavLink 
                                       to={`http://localhost:5173/artist/${artist?.id}`} 
                                       className="hover:text-white"
                                   >
                                       {artist?.name}
                                   </NavLink>
                                   {i < track.artists.length - 1 && <span>,</span>}
                               </React.Fragment>
                           ))}
                       </div>
       
                       <div className="text-gray-300 text-sm">
                           <b>{songDuration(track?.duration_ms)}</b>
                       </div>
                   </div>
               )
           ))}
       </div>
       
        ) : (
            <div className="text-center text-gray-400">Loading...</div>
        )}
        <style>
            {`.search_image_shadow{
                box-shadow: 5px 5px 0px #4949bf;
            }`}
        </style>
    </div>
    
    )
}