import React,{useState,useEffect,useRef} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play,Pause,skipToNext,skipToPrevious,songDuration,RepeatMode,seekSong,setVolume, addToQueue } from "../utility/SongManipulation";
import "./style.css";
import { NavLink } from "react-router-dom";

export const PlayerController = () => {
    
    const session_details = sessionStorage.getItem("session_details");
    const intervalRef = useRef(null);
    const trackerRef = useRef(null);
    const volumeRef = useRef(100);

    const {player,deviceId} = useWebPlayback();
    const [currentlyPlaying,setCurrentlyPlaying] = useState();
    const [currentTime,setCurrenTime] =  useState("");
    const [positionMs,setPositionMs] = useState(0);
    const [repeatMode,setRepeatMode] = useState(0);
    const [isPlay,setIsPlay] = useState();
    const [volume,getVolume] = useState(100);
    
    useEffect(() => {
        if (!player) return; 
        
        const handlePlayerStateChange = (state) => {
            if (!state) {
                return;
            }
            setCurrentlyPlaying(state);
        };
        
        player.addListener("player_state_changed", handlePlayerStateChange);
        
        player.getCurrentState().then((state) => {
            if (!state) {
                return;
            }
            setCurrentlyPlaying(state);
        })
        return () => player.removeListener("player_state_changed", handlePlayerStateChange);
    },[player]); 

    useEffect(() => {

        if (!player) return;

        intervalRef.current = setInterval(() => {
            player.getCurrentState().then((state) => {
                if (!state) {
                    return;
                }
                
                let currentMinute = Math.floor((state.position / 1000) / 60);
                let currentSecond = Math.floor((state.position / 1000) % 60);
                
                let formattedMinute = currentMinute < 10 ? `0${currentMinute}` : currentMinute;
                let formattedSecond = currentSecond < 10 ? `0${currentSecond}` : currentSecond;
                
                setCurrenTime(`${formattedMinute}:${formattedSecond}`);
                setPositionMs(state.position);
                setRepeatMode(state.repeat_mode);
                trackerRef.current.value = state.position;
            });
        }, 900);
        
        return () => clearInterval(intervalRef.current);
    },[player]); 
    
    const handleMusic = (id,type) => {
        if(isPlay == id){
            Pause(id,deviceId,type)
            setIsPlay(null);
        }else{
            Play(id,deviceId,type,positionMs);
            setIsPlay(id);
        }
    }

    const skipSong = (position,deviceId) => {
        trackerRef.current.value = position
        seekSong(position,deviceId)
    }

    const changeVolume = (volume,deviceId) => {
            
        volumeRef.current.value = volume;
        getVolume(volume)
        setVolume(volume,deviceId)
    }
    
    return(
        <div className="w-screen h-full">
            {
                currentlyPlaying && Object.keys(currentlyPlaying).length > 0 ? (                  
                    <div key={currentlyPlaying.track_window.current_track.name} className="flex items-center w-full h-full py-5 bg-indigo-800">
                        <div className="flex items-center w-[30%] h-full px-5">
                            <img 
                                className="w-10 h-10 controller_image rounded"    
                                src={currentlyPlaying.track_window.current_track.album.images[0].url} 
                                alt={"Nothing"} 
                            />
                            <p className="font-bold ml-5">{currentlyPlaying.track_window.current_track.name}</p>
                        </div>
                        <div className="flex w-[50]% h-[100]% justify-evenly items-center px-5">
                            <div onClick={() => skipToPrevious(deviceId)} className="text_highlight">
                                <i className="ri-skip-left-fill text-4xl"></i>
                            </div>
                            <div onClick={() => handleMusic(currentlyPlaying.track_window.current_track.id,"track",positionMs)}>
                                {
                                    currentlyPlaying && currentlyPlaying.paused == false ?(
                                        <i className="ri-pause-circle-fill text-4xl text_highlight"></i>
                                    ):(
                                        <i className="ri-play-circle-fill text-4xl text_highlight"></i>
                                    )
                                }
                            </div>
                            <div onClick={() => skipToNext(deviceId)} >
                                <i className="ri-skip-right-fill text-4xl text_highlight"></i>
                            </div>
                            <div className="h-full">
                                <input 
                                    type="range" 
                                    ref={trackerRef}
                                    className="tracker w-100 music-slider"
                                    max={currentlyPlaying.duration}
                                    onMouseUp={() => skipSong(trackerRef.current.value,deviceId)}
                                    color="text_highlight"
                                />
                            </div>
                            <div className="w-full h-full  mx-2 ">
                                <p>{currentTime}/{songDuration(currentlyPlaying.duration)}</p>
                            </div>
                        </div>
                        <div className="flex w[20]% h[100]% justify-center items-center px-5">
                            <div className="w-full h-full mx-2 ">
                                <i className="ri-heart-line"></i>
                            </div>
                            <div className="w-full h-full">
                                {
                                    volume > 50 ? (
                                        <i className="ri-volume-up-line"></i>
                                    ):(
                                        volume == 0 ? (
                                            <i className="ri-volume-mute-line"></i>
                                        ):(
                                            <i className="ri-volume-down-line"></i>
                                        )
                                    )
                                }
                            </div>
                            <div className="w-full h-full mx-2">
                                <input 
                                    type="range" 
                                    ref={volumeRef}
                                    className="music-slider"
                                    min={0}
                                    max={100}
                                    onMouseUp={() => changeVolume(volumeRef.current.value,deviceId)}
                                    />
                            </div>
                            <div className="mx-1">
                                <i class="ri-shuffle-line"></i>
                            </div>
                            <div className="mx-1">
                                <div className="hover:cursor-pointer">
                                {
                                    repeatMode == 0 ?(
                                        <div onClick={() => RepeatMode(deviceId,"context")}>
                                            <i class="ri-repeat-fill"></i>  
                                        </div>
                                    ):(
                                        repeatMode == 1 ? (
                                            <div onClick={() => RepeatMode(deviceId,"track")}>
                                                <i class="ri-repeat-2-fill"></i>
                                            </div>
                                            ):(
                                                <div onClick={() => RepeatMode(deviceId,"off")}>
                                                    <i class="ri-repeat-one-fill"></i>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div 
                                className="mx-1"
                                onClick={() => addToQueue(deviceId,currentlyPlaying.track_window.current_track.id)}>
                                <i class="ri-order-play-line"></i>
                            </div>
                            <div className="mx-1">
                                <NavLink to={`http://localhost:5173/lyrics`}>
                                    <i className="ri-closed-captioning-line"></i>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ):(
                    <div key={""} className="flex items-center w-full h-full py-5 bg-indigo-800">
                        <div className="flex items-center w-[30%] h-full px-5">
                            <img 
                                className="w-10 h-10 controller_image rounded"    
                                src={""} 
                                alt={"Nothing"} 
                            />
                            <p className="font-bold ml-5">{}</p>
                        </div>
                        <div className="flex w-[40]% h-[100]%">
                            <div onClick={() => skipToPrevious(deviceId)} className="text_highlight">
                                <i className="ri-skip-left-fill text-3xl"></i>
                            </div>
                            <div className="text-2xl" onClick={() => handleMusic(currentlyPlaying.track_window.current_track.id,"track",positionMs)}>
                            {
                                currentlyPlaying && currentlyPlaying.paused == false ?(
                                    <i className="ri-pause-circle-fill text-3xl text_highlight"></i>
                                ):(
                                    <i className="ri-play-circle-fill text-3xl text_highlight"></i>
                                )
                            }
                            </div>
                            <div onClick={() => skipToNext(deviceId)} >
                                <i className="ri-skip-right-fill text-3xl text_highlight"></i>
                            </div>
                            <div className="h-full">
                                <input 
                                    type="range" 
                                    ref={trackerRef}
                                    className="tracker w-100 music-slider"
                                    max={""}
                                    onChange={() => skipSong(trackerRef.current.value,deviceId)}
                                    color="text_highlight"
                                />
                            </div>
                            <div className="mx-2">
                                <p>{"Time Will Be Show here"}</p>
                            </div>
                        </div>
                        <div className="flex w[30]% h[100]%">
                            <div>
                                <i className="ri-heart-line"></i>
                            </div>
                            <div>
                                {
                                    volume > 50 ? (
                                        <i className="ri-volume-up-line"></i>
                                    ):(
                                        volume == 0 ? (
                                            <i className="ri-volume-mute-line"></i>
                                        ):(
                                            <i className="ri-volume-down-line"></i>
                                        )
                                    )
                                }
                                <input 
                                    type="range" 
                                    ref={volumeRef}
                                    min={0}
                                    max={100}
                                    onChange={() => changeVolume(volumeRef.current.value,deviceId)}
                                />
                            </div>
                            <div>
                                <div className="hover:cursor-pointer">
                                {
                                    repeatMode == 0 ?(
                                        <div onClick={() => RepeatMode(deviceId,"context")}>
                                            <i class="ri-repeat-fill"></i>  
                                        </div>
                                    ):(
                                        repeatMode == 1 ? (
                                            <div onClick={() => RepeatMode(deviceId,"track")}>
                                                <i class="ri-repeat-2-fill"></i>
                                            </div>
                                            ):(
                                                <div onClick={() => RepeatMode(deviceId,"off")}>
                                                    <i class="ri-repeat-one-fill"></i>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div onClick={() => addToQueue(deviceId,currentlyPlaying.track_window.current_track.id)}>
                                <i class="ri-order-play-line"></i>
                            </div>
                            <div>
                                <i class="ri-shuffle-line"></i>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}