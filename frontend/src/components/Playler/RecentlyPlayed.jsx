import React,{useState, useEffect} from "react";
import axios from "axios";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { PlaySong,PauseSong,getCurrentState } from "../utility/SongManipulation";
import { PlayerController } from "./Controller";
import { NavLink } from "react-router-dom";
import './style.css'


export const RecenltyPlayed = () => {

    const session_details = sessionStorage.getItem("session_details");
    const [playerDetails,setPlayerDetails] = useState("");
    const [recenltyPlayed,setRecentlyPlayed] = useState([]);
    const [deviceId,setDeviceId] = useState("");
    const [isPlay,setIsPlay] = useState(false);
    const player  =  useWebPlayback();  
    
    useEffect(() => {

        if(player){

            player.addListener('ready',({device_id}) => {
                setDeviceId(device_id);
            });
            
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
    
        const handlePlayerStateChange = (state) => {
            if (!state) {
                console.log("Nothing Playing Currently");
            }
            setPlayerDetails(state);
        };
    
        player.addListener("player_state_changed", handlePlayerStateChange);
        
        player.addListener("ready",
            player.getCurrentState().then((state) => {
                if (!state) {
                    console.log("Nothing Playing Currently");
                }
                setPlayerDetails(state);
            })
        )
    
        return () => player.removeListener("player_state_changed", handlePlayerStateChange);
    }, [isPlay]); 
    
    useEffect(() => {
        if(!player) return;
        player.addListener("player_state_changed",
            player.getCurrentState().then((state) => {
                setPlayerDetails(state)
            })
        )
    },[isPlay])

    const handleMusic = (id) => {

        if(id == isPlay){
            PauseSong(id,deviceId);
            setIsPlay(null);
        }else{
            PlaySong(id,deviceId);
            setIsPlay(id);
        }
    }
    console.log(playerDetails);
    
    return(
        <div>
            {
                (recenltyPlayed || playerDetails )  && Object.keys(recenltyPlayed).length > 0 ? (
                    <div className="flex flex-col w-fit max-w-full h-fit">
                        {
                            recenltyPlayed.items.map((tracks,index) => (
                                <div key={index} className="flex rounded py-2 bg-black hover:bg-indigo-800">
                                    <div
                                        key={index+1}
                                        onClick={() => handleMusic(tracks.track.id)} 
                                        className="flex justify-center items-center ml-3">
                                        <div key={index+2} className="absolute">
                                            {
                                             tracks.track.id == isPlay || playerDetails == true ? (
                                                    <i className="ri-pause-fill"></i>
                                                ):(
                                                    <i className="ri-play-fill"></i>
                                                )
                                            }
                                        </div>
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
                    <PlayerController />
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
