import React,{useState, useEffect, useRef} from "react";
import axios from "axios";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play,Pause } from "../utility/SongManipulation";
import { NavLink } from "react-router-dom";
import './style.css'


export const RecenltyPlayed = () => {

    const session_details = sessionStorage.getItem("session_details");
    const [recenltyPlayed,setRecentlyPlayed] = useState([]);
    const [isPlay,setIsPlay] = useState(false);
    const {player,deviceId}  =  useWebPlayback();  
    const [positionMs,setPositionMs]  =  useState(0);
    const [currentState,setCurrentState]  =  useState(0);
    
    useEffect(() => {

        if(player){
            
            axios.get(`http://localhost:5000/recently-played?session_details=${session_details}&deviceId=${deviceId}`,{
                headers:{
                    "Content-Type":"appliction/json"
                }
            }).then((response) => {
                if(response.status === 200){
                    setRecentlyPlayed(response.data)
                }
            });        
        }
    },[player]);

    useEffect(() => {
        if (!player) return;
            player.getCurrentState().then((state) => {
                if (!state) {
                    return;
                }                
                setCurrentState(state)
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
    console.log(currentState);
    
    return(
        <div>
            {
                (recenltyPlayed)  && Object.keys(recenltyPlayed).length > 0 ? (
                    <div className="flex flex-col w-fit max-w-full h-fit">
                        {
                            recenltyPlayed.items.map((tracks,index) => (
                                <div key={index} className="flex rounded py-2 bg-black hover:bg-indigo-800">
                                    <div
                                        key={index+1}
                                        onClick={() => handleMusic(tracks.track.id,"track")} 
                                        className="flex justify-center items-center ml-3">
                                        {/* <div key={index+2} className="absolute ">
                                            {
                                             tracks.track.id == isPlay || currentState.paused == true ? (
                                                    <i className="ri-pause-fill"></i>
                                                ):(
                                                    <i className="ri-play-fill"></i>
                                                )
                                            }
                                        </div> */}
                                        <img 
                                            key={index+3}
                                            className="w-10 h-15 rounded recently_image"
                                            src={tracks.track.album.images[0].url}
                                        />
                                    </div>
                                    <div key={index+4}  className="flex flex-col justify-center text-white ml-5">
                                        <div key={index+5}>{tracks.track.name}</div>
                                        <div index={index+6} className="flex justify-center">
                                        {
                                            tracks.track.artists.map((artist) => (
                                                <NavLink to={`http://localhost:5173/artist/${artist.id}`}>{artist.name}</NavLink>
                                            ))
                                        }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ):( 
                    <div>
                        Loading....
                    </div>
                )
            }
        </div>
    )

}
