import React,{useState,useEffect,useRef} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play,Pause,skipToNext,skipToPrevious,songDuration,RepeatMode,seekSong,setVolume } from "../utility/SongManipulation";
import "./style.css";
import { NavLink } from "react-router-dom";
import { Queue } from "./Queue";
import { PlayRandom } from "../utility/SongManipulation";

export const PlayerController = () => {
    
    const session_details = sessionStorage.getItem("session_details");
    const playerDetails = JSON.parse(localStorage.getItem("player_details"));
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
    const [queue,setQueue] = useState(false)
    const [hasPlayedNext, setHasPlayedNext] = useState(false);
    
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
            localStorage.setItem("player_details",JSON.stringify(state));            
            
        })
        return () => player.removeListener("player_state_changed", handlePlayerStateChange);
    },[player]); 

    useEffect(() => { 
        if (!player) return;

        intervalRef.current = setInterval(() => {
            player.getCurrentState().then((state) => {
                if (!state) return;
                
                setCurrenTime(state.position);
                setPositionMs(state.position);
                setRepeatMode(state.repeat_mode);
                trackerRef.current.value = state.position;

                if (state.paused === true && state.position === 0 && !hasPlayedNext) {  
                    setHasPlayedNext(true); 
                    PlayRandom(deviceId);
                } else if (state.paused === false) {
                    setHasPlayedNext(false);
                }
            });
        }, 900);

        return () => clearInterval(intervalRef.current);
}, [player, hasPlayedNext]);

    
    
    const handleMusic = (id,type) => {
        if(isPlay == id){
            Pause(id,deviceId,type)
            setIsPlay(null);
        }else{
            setPositionMs(0)
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
        {currentlyPlaying && Object.keys(currentlyPlaying).length > 0 ? (
          <div
            key={currentlyPlaying.track_window.current_track.name}
            className="flex justify-between items-center w-full h-full py-5 player_container"
          >

            <div className="flex items-center w-[25%] px-5 space-x-3">
              <img
                className="w-12 h-12 rounded"
                src={currentlyPlaying.track_window.current_track.album.images[0].url}
                alt="Album Art"
              />
              <div className="flex flex-col">
                <p className="font-bold">{currentlyPlaying?.track_window?.current_track?.name}</p>
                <div className="text-sm">
                  {currentlyPlaying?.track_window?.current_track?.artists.map((artist, i) => (
                    <React.Fragment key={artist?.id}>
                      <NavLink to={`/artist/${artist?.id}`} className="hover:underline">
                        {artist?.name}
                      </NavLink>
                      {i < currentlyPlaying?.track_window?.current_track?.artists.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-[45%] items-center justify-center space-x-5">
              <i onClick={() => skipToPrevious(deviceId)} className="ri-skip-left-fill text-3xl cursor-pointer"></i>

              <i
                onClick={() => handleMusic(currentlyPlaying.track_window.current_track.id, "track", positionMs)}
                className={`text-4xl cursor-pointer ${
                  currentlyPlaying.paused ? "ri-play-circle-fill" : "ri-pause-circle-fill"
                }`}
              ></i>

              <i onClick={() => skipToNext(deviceId)} className="ri-skip-right-fill text-3xl cursor-pointer"></i>

              <input
                type="range"
                ref={trackerRef}
                className="w-[50%] music-slider"
                max={currentlyPlaying.duration}
                onMouseUp={() => skipSong(trackerRef.current.value, deviceId)}
              />

              <p className="text-sm">
                {songDuration(currentTime)} / {songDuration(currentlyPlaying.duration)}
              </p>
            </div>

            <div className="flex w-[30%] items-center justify-center space-x-3">
              <i className="ri-heart-line cursor-pointer"></i>

              <i className={`cursor-pointer ${volume > 50 ? "ri-volume-up-line" : volume === 0 ? "ri-volume-mute-line" : "ri-volume-down-line"}`}></i>
              <input
                type="range"
                ref={volumeRef}
                className="w-[80px] music-slider"
                min={0}
                max={100}
                onMouseUp={() => changeVolume(volumeRef.current.value, deviceId)}
              />

              <i className="ri-shuffle-line cursor-pointer"></i>

              <div className="cursor-pointer" onClick={() => RepeatMode(deviceId, repeatMode === 0 ? "context" : repeatMode === 1 ? "track" : "off")}>
                <i className={`ri-repeat${repeatMode === 1 ? "-2" : repeatMode === 2 ? "-one" : ""}-fill`}></i>
              </div>

              <i className="ri-order-play-line cursor-pointer"></i>
              <Queue />

              <NavLink to="/lyrics">
                <i className="ri-closed-captioning-line cursor-pointer"></i>
              </NavLink>
            </div>
          </div>
        ) : (
          <div
            key={playerDetails.track_window.current_track.name}
            className="flex justify-between items-center w-full h-full py-5 player_container"
          >
            <div className="flex items-center w-[25%] px-5 space-x-3">
              <img
                className="w-12 h-12 rounded"
                src={playerDetails.track_window.current_track.album.images[0].url}
                alt="Album Art"
              />
              <div className="flex flex-col">
                <p className="font-bold">{playerDetails?.track_window?.current_track?.name}</p>
                <div className="text-sm">
                  {playerDetails?.track_window?.current_track?.artists.map((artist, i) => (
                    <React.Fragment key={artist?.id}>
                      <NavLink to={`/artist/${artist?.id}`} className="hover:underline">
                        {artist?.name}
                      </NavLink>
                      {i < playerDetails?.track_window?.current_track?.artists.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-[45%] items-center justify-center space-x-5">
              <i onClick={() => skipToPrevious(deviceId)} className="ri-skip-left-fill text-3xl cursor-pointer"></i>

              <i
                onClick={() => handleMusic(playerDetails.track_window.current_track.id, "track", positionMs)}
                className={`text-4xl cursor-pointer ${
                  playerDetails.paused ? "ri-play-circle-fill" : "ri-pause-circle-fill"
                }`}
              ></i>

              <i onClick={() => skipToNext(deviceId)} className="ri-skip-right-fill text-3xl cursor-pointer"></i>

              <input
                type="range"
                ref={trackerRef}
                className="w-[50%] music-slider"
                max={playerDetails.duration}
                onMouseUp={() => skipSong(trackerRef.current.value, deviceId)}
              />

              <p className="text-sm">
               {songDuration(playerDetails.duration)}
              </p>
            </div>

            <div className="flex w-[30%] items-center justify-center space-x-3">
              <i className="ri-heart-line cursor-pointer"></i>

              <i className={`cursor-pointer ${volume > 50 ? "ri-volume-up-line" : volume === 0 ? "ri-volume-mute-line" : "ri-volume-down-line"}`}></i>
              <input
                type="range"
                ref={volumeRef}
                className="w-[80px] music-slider"
                min={0}
                max={100}
                onMouseUp={() => changeVolume(volumeRef.current.value, deviceId)}
              />

              <i className="ri-shuffle-line cursor-pointer"></i>

              <div className="cursor-pointer" onClick={() => RepeatMode(deviceId, repeatMode === 0 ? "context" : repeatMode === 1 ? "track" : "off")}>
                <i className={`ri-repeat${repeatMode === 1 ? "-2" : repeatMode === 2 ? "-one" : ""}-fill`}></i>
              </div>

              <i className="ri-order-play-line cursor-pointer"></i>
              <Queue />

              <NavLink to="/lyrics">
                <i className="ri-closed-captioning-line cursor-pointer"></i>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    )
}