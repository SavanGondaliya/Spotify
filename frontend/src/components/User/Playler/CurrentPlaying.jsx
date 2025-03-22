import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Play,
  Pause,
  skipToNext,
  skipToPrevious,
  songDuration,
  RepeatMode,
  seekSong,
  setVolume,
} from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { getUserPlaylist } from "../utility/SongManipulation";
import MusicLoader from "../utility/Loader";


export const Currently = () => {

  const session_details = sessionStorage.getItem("session_details");
  const { player, deviceId } = useWebPlayback();
  const [currentState, setCurrentState] = useState();
  const [userPlaylists, setUserPlaylists] = useState();
  const intervalRef = useRef(null);
  const trackerRef = useRef(null);
  const volumeRef = useRef(100);
  const [currentTime, setCurrenTime] = useState("");
  const [positionMs, setPositionMs] = useState(0);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isPlay, setIsPlay] = useState();
  const [volume, getVolume] = useState(100);

  const playlist = async () => {
    let playlist = await getUserPlaylist();
    setUserPlaylists(playlist);
  };

  useEffect(() => {
    playlist();
  }, []);

  useEffect(() => {
    if (!player) return;

    intervalRef.current = setInterval(() => {
      player.getCurrentState().then((state) => {
        if (!state) {
          return;
        }

        let currentMinute = Math.floor(state.position / 1000 / 60);
        let currentSecond = Math.floor((state.position / 1000) % 60);

        let formattedMinute =
          currentMinute < 10 ? `0${currentMinute}` : currentMinute;
        let formattedSecond =
          currentSecond < 10 ? `0${currentSecond}` : currentSecond;

        setCurrenTime(`${formattedMinute}:${formattedSecond}`);
        setPositionMs(state.position);
        setRepeatMode(state.repeat_mode);
        trackerRef.current.value = state.position;
      });
    }, 900);

    return () => clearInterval(intervalRef.current);
  }, [player]);

  const PlayRandom = async () => {
    try {
      console.log("called...");

      axios
        .get(`http://localhost:5000/local/tracks`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            let randomIndex = Math.floor(Math.random() * res.data.length);
            Play(res.data[randomIndex], deviceId, "track", 0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handleMusic = (id, type) => {
    if (isPlay == id) {
      PlayRandom();
      // Pause(id, deviceId, type);
      setIsPlay(null);
    } else {
      Play(id, deviceId, type, positionMs);
      setIsPlay(id);
    }
  };

  const skipSong = (position, deviceId) => {
    trackerRef.current.value = position;
    seekSong(position, deviceId);
  };

  const changeVolume = (volume, deviceId) => {
    volumeRef.current.value = volume;
    getVolume(volume);
    setVolume(volume, deviceId);
  };

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

  return (
    <div className="w-full h-full">
      <div>
        <h1>Currently Playing</h1>
      </div>
      {currentState ? (
        <div className="flex flex-col justify-center items-center ">
          <div className="w-200 h-100 relative rounded player_container">
            <div className="w-200 h-[100%] rounded">
              <img
                className="w-full h-full rounded player_shadow"
                src={
                  currentState.track_window.current_track.album.images[0].url
                }
                alt=""
                srcset=""
              />
            </div>
            <div className="absolute top-20 left-20">
              <div className="h-full w-full">
                <img
                  className="w-40 h-40 inner_image_shadow"
                  src={
                    currentState?.track_window?.current_track?.album?.images[0]
                      ?.url
                  }
                  alt=""
                />
                <p className="font-bold ml-5">
                  {currentState?.track_window?.current_track?.name}
                </p>
                {currentState?.track_window?.current_track?.artists.map(
                  (artist, i) => (
                    <React.Fragment key={artist?.id}>
                      {artist.name}
                      {i <
                        currentState?.track_window?.current_track?.artists
                          .length -
                          1 && ", "}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>
            <div className="bg-indigo-800 w-full p-4 absolute bottom-0 rounded-b-lg flex flex-col items-center">
              {/* Progress Bar */}
              <div className="w-[90%] flex items-center justify-between">
                <span className="text-white text-sm">{currentTime}</span>
                <input
                  type="range"
                  ref={trackerRef}
                  className="w-full mx-4 music-slider"
                  max={currentState.duration}
                  onMouseUp={() => skipSong(trackerRef.current.value, deviceId)}
                />
                <span className="text-white text-sm">
                  {songDuration(currentState.duration)}
                </span>
              </div>

              {/* Music Controls */}
              <div className="flex items-center justify-between w-full mt-3 px-6">
                <i className="ri-add-fill text-white text-xl cursor-pointer"></i>

                <div className="flex items-center space-x-4">
                  <i className="ri-shuffle-line text-white text-xl cursor-pointer"></i>
                  <i
                    className="ri-skip-left-fill text-3xl text-white cursor-pointer"
                    onClick={() => skipToPrevious(deviceId)}
                  ></i>
                  <i
                    className={`ri-${
                      currentState.paused ? "play" : "pause"
                    }-circle-fill text-4xl text-white cursor-pointer`}
                    onClick={() =>
                      handleMusic(
                        currentState.track_window.current_track.id,
                        "track",
                        positionMs
                      )
                    }
                  ></i>
                  <i
                    className="ri-skip-right-fill text-3xl text-white cursor-pointer"
                    onClick={() => skipToNext(deviceId)}
                  ></i>

                  {/* Repeat Button */}
                  <div className="cursor-pointer">
                    {repeatMode === 0 ? (
                      <i
                        className="ri-repeat-fill text-white"
                        onClick={() => RepeatMode(deviceId, "context")}
                      ></i>
                    ) : repeatMode === 1 ? (
                      <i
                        className="ri-repeat-2-fill text-white"
                        onClick={() => RepeatMode(deviceId, "track")}
                      ></i>
                    ) : (
                      <i
                        className="ri-repeat-one-fill text-white"
                        onClick={() => RepeatMode(deviceId, "off")}
                      ></i>
                    )}
                  </div>
                </div>

                {/* Volume & Favorite */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <i
                      className={`text-white text-xl  ${
                        volume > 50
                          ? "ri-volume-up-line"
                          : volume === 0
                          ? "ri-volume-mute-line"
                          : "ri-volume-down-line"
                      }`}
                    ></i>
                    <input
                      type="range"
                      ref={volumeRef}
                      className="ml-2 music-slider"
                      min={0}
                      max={100}
                      onMouseUp={() =>
                        changeVolume(volumeRef.current.value, deviceId)
                      }
                    />
                  </div>
                  <i className="ri-heart-line text-3xl text-white cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>

        </div>
      )}
      <style>
        {`  
          .music-slider {
              height: 5px;
              appearance: none;
              outline: none;
              background: #555; /* Default background for unfilled portion */
              cursor: pointer;
          }
          
          /* Style the filled progress */
          .music-slider::-webkit-slider-runnable-track {
              height: 5px;
              background: #f2c178; /* Filled portion */
          }
          
          /* Style the thumb (circle) */
          .music-slider::-webkit-slider-thumb {
              appearance: none;
              width: 12px;
              height: 12px;
              background: white;
              border-radius: 50%;
              margin-top: -3px;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          }
          
          /* Firefox styles */
          .music-slider::-moz-range-track {
              height: 6px;
              border-radius: 5px;
              background: #555;
          }
          
          .music-slider::-moz-range-progress {
              background: linear-gradient(90deg, #1db954, #1ed760);
              height: 6px;
              border-radius: 5px;
          }
        `          
        }
      </style>
    </div>
  );
};
