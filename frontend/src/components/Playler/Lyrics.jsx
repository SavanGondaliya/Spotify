import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWebPlayback } from "../utility/WebPlayBackSDK";


export const Lyrics = ({song_name,artist_name}) => {


    const [lyrics,setLyrics] = useState();
    const {player,deviceId} = useWebPlayback();
    const [length,setLength] = useState(); 
    const [currentState,setCurrentState] = useState();
    
      useEffect(() => {
    
        if (!player) return;
    
        const handlePlayerStateChange = (state) => {
          if (!state) {
            return;
          }
          setCurrentState(state);
        };
    
        player.addListener("player_state_changed", handlePlayerStateChange);
    
        player.getCurrentState().then((state) => {
          if (!state) {
            return;
          }
    
          setCurrentState(state);
        });
        return () =>
          player.removeListener("player_state_changed", handlePlayerStateChange);
      }, [player]);
    
    

    const getLyrics = async() => {
        try {
            
            const response = await axios.get(`http://localhost:5000/lyrics?song_name=${song_name}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                console.log(response.data);
                
                setLyrics(response.data)
            }
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getLyrics();
    },[currentState]);

     
    return (
        <div className="flex justify-center items-center">
            <div className=" h-full bg-indigo-900 w-200 overflow-y-scroll">
                {
                    lyrics && lyrics.length > 0 ? (
                        <div className="w-full h-full p-5 text-start">
                            {
                                lyrics.map((words,index) => (
                                    <p key={index} className="text-2xl text-black">{words}</p>
                                ))
                            }
                        </div>
                    ):(
                        <div>Loading...</div>
                    )
                }         
            </div>
        </div>
    )
}