import axios from "axios";
import React,{useState,useEffect} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { getCurrentState } from "../utility/SongManipulation";
import "./style.css"

export const PlayerController = () => {
    
    const session_details = sessionStorage.getItem("session_details");
    const [currentlyPlaying,setCurrentlyPlaying] = useState();
    const [deviceId,setDeviceId] = useState(null);
    const player = useWebPlayback()
    // const [currentTime,setCurrentTime] = useState("00");
    // const [duration,setDuration] = useState("00");

    useEffect(() => {
        if (!player) return; // Ensure player is defined
        
        player.addListener("ready", ({ device_id }) => {
            setDeviceId(device_id);
        });
    
    }, [player]);
    
    useEffect(() => {
        if (!player) return; 
    
        const handlePlayerStateChange = (state) => {
            if (!state) {
                console.log("Nothing Playing Currently");
            }
            setCurrentlyPlaying(state);
        };
    
        player.addListener("player_state_changed", handlePlayerStateChange);
                
        player.getCurrentState().then((state) => {
            if (!state) {
                console.log("Nothing Playing Currently");
            }
            setCurrentlyPlaying(state);
        })

        return () => player.removeListener("player_state_changed", handlePlayerStateChange);
    }); 
            
    // useEffect(() => {
        
    //         let endMinute = Math.floor((currentlyPlaying.duration / 1000) / 60)
    //         let currentMinute  = Math.floor((currentlyPlaying.duration / 1000) /60)
    //         let endSecond = Math.floor((currentlyPlaying.position / 1000) % 60)
    //         let currentSecond = Math.floor((currentlyPlaying.position / 1000) % 60)
    //         if (endSecond < 10) endSecond = "0"+ endSecond
    //         if (currentSecond < 10) currentSecond = "0"+ currentSecond
    
    //         setDuration(`${endMinute}:${endSecond}`)
    //         setCurrentTime(`${currentMinute}:${currentSecond}`)
        
    // },[currentlyPlaying])

    return(
        <div>
            {
                currentlyPlaying && Object.keys(currentlyPlaying).length > 0 ? (                  
                    <div key={currentlyPlaying.track_window.current_track.name} className="flex w-dvw h-[10]% py-5 bg-indigo-800">
                        <div className="flex items-center">
                            <img 
                                className="w-10 h-10 controller_image rounded"    
                                src={currentlyPlaying.track_window.current_track.album.images[0].url} 
                                alt={"Nothing"} 
                            />
                            <p className="font-bold ml-5">{currentlyPlaying.track_window.current_track.name}</p>
                        </div>
                        <div className="flex">
                            <div>
                                <i className="ri-skip-left-fill"></i>
                            </div>
                            <div>
                            {
                                currentlyPlaying && currentlyPlaying.paused == false ?(
                                    <i className="ri-pause-circle-fill"></i>
                                ):(
                                    <i className="ri-play-circle-fill"></i>
                                )
                            }
                            </div>
                            <div>
                                <i className="ri-skip-right-fill"></i>
                            </div>
                            <div >
                                <input 
                                    type="range" 
                                    className=".tracker"
                                    onChange={() => skip()}
                                />
                            </div>
                        </div>
                        <div className="">
                            {/* <p>{currentTime}/{duration}</p> */}
                        </div>
                    </div>
                ):(
                    <div className="flex w-dvw h-[10]% py-5 bg-indigo-800">
                        <div className="flex items-center">
                            <img 
                                className="w-10 h-10 controller_image rounded"    
                            />
                            <p className="font-bold ml-5"></p>
                        </div>
                        <div className="flex">
                            <div>
                                <i className="ri-skip-left-fill"></i>
                            </div>
                            <div>
                                <i className="ri-play-circle-fill"></i> 
                            </div>
                            <div>
                                <i className="ri-skip-right-fill"></i>
                            </div>
                            <div >
                                <input 
                                    type="range" 
                                    className=".tracker"
                                    onChange={() => skip()}
                                />
                            </div>
                        </div>
                        <div className="">
                            {/* <p>{currentTime}/{duration}</p> */}
                        </div>
                    </div>
                )
            }
        </div>
    )
}