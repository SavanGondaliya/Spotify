import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWebPlayback } from "../utility/WebPlayBackSDK";


export const Lyrics = ({song_name,artist_name}) => {

    console.log(artist_name);
    
    const [lyrics,setLyrics] = useState();
    const {player,deviceId} = useWebPlayback();
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
            const url = `http://localhost:5000/lyrics?song_name=${song_name.slice(0,song_name.indexOf('(' ? '(' : '-'))}`
            
            const response = await axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                setLyrics(response.data)
            }
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        console.log("ueseffect called off.");
        
        getLyrics();
    },[currentState]);

    return (
        <div className="flex justify-center items-center rounded">
            {
                lyrics && lyrics.length > 0 ? (
                    <div className="bg-indigo-900 w-200 h-100 rounded p-5 text-start container_shadow">
                        <div>
                            <h1 className="text-3xl">Lyrics</h1>
                        </div>
                        <div className="bg-indigo-400 w-[100%] h-[90%] p-5 rounded overflow-y-scroll lyrics_container">
                        {
                            lyrics.map((words,index) => (
                                <p key={index} className="text-white text-2xl">{words}</p>
                                
                            ))
                        }
                        </div>
                    </div>
                ):(
                    <div className="bg-indigo-900 w-200 h-100 rounded p-5 text-start container_shadow">
                        <div>
                            <h1 className="text-4xl">Lyrics</h1>
                        </div>
                        <div className="bg-indigo-400 w-[100%] h-[90%] p-5 rounded overflow-y-scroll lyrics_container">
                            <h1>Lyrics Will be shown Here!!!</h1>
                        </div>
                    </div>
                )
            }         
        </div>
    )
}