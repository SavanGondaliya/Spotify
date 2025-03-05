import React, { useEffect, useState, useRef } from "react";
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
import { PlaylistDropDown } from "../Playlist/PlaylistDropDown";


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

   const playlist = async() => {
        let playlist  = await getUserPlaylist();
        setUserPlaylists(playlist)
    }
  
    useEffect(() => {
        playlist();
    },[]);

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

  const handleMusic = (id, type) => {
    if (isPlay == id) {
      Pause(id, deviceId, type);
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
        <div className="flex flex-col justify-center items-center">
          <div className="w-200 h-100  relative rounded">
            <div className="w-200 h-100 rounded">
              <img
                className="w-full h-full"
                src={
                  currentState.track_window.current_track.album.images[0].url
                }
                alt=""
                srcset=""
              />
            </div>
            <div className="absolute top-20 left-20">
              <div className="w-40 h-40">
                <img
                  src={
                    currentState.track_window.current_track.album.images[0].url
                  }
                  alt=""
                />
                <p className="font-bold ml-5">
                  {currentState.track_window.current_track.name}
                </p>
                {currentState.track_window.current_track.artists.map(
                  (artist) => {
                    <p>{artist.name}</p>;
                  }
                )}
              </div>
            </div>
            <div className="bg-indigo-800 w-200 h-25 bottom-0 absolute">
                <div className="flex justify-center items-center">
                    <div>   
                        <div className="h-full my-2">
                            <span className="mx-2">
                                {currentTime}
                            </span>
                            <input
                                type="range"
                                ref={trackerRef}
                                className="tracker w-100 music-slider"
                                max={currentState.duration}
                                onMouseUp={() =>
                                    skipSong(trackerRef.current.value, deviceId)
                                }
                                color="text_highlight"
                            />
                            <span className="mx-2">
                                {songDuration(currentState.duration)}
                            </span>
                        </div>
                        <div>
                            <div className="flex w-full h-full justify-around items-center px-5">
                                <div className="">
                                    <i className="ri-add-fill"></i>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="mx-2 ">
                                        <i class="ri-shuffle-line"></i>
                                    </div>
                                    <div
                                        onClick={() => skipToPrevious(deviceId)}
                                        className="text_highlight"
                                    >
                                        <i className="ri-skip-left-fill text-4xl"></i>
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleMusic(
                                                currentState.track_window.current_track.id,
                                                "track",
                                                positionMs
                                            )
                                        }
                                    >
                                        {currentState && currentState.paused == false ? (
                                        <i className="ri-pause-circle-fill text-4xl text_highlight"></i>
                                        ) : (
                                        <i className="ri-play-circle-fill text-4xl text_highlight"></i>
                                        )}
                                    </div>
                                    <div onClick={() => skipToNext(deviceId)}>
                                        <i className="ri-skip-right-fill text-4xl text_highlight"></i>
                                    </div>
                                    <div className="hover:cursor-pointer">
                                        {repeatMode == 0 ? (
                                            <div onClick={() => RepeatMode(deviceId, "context")}>
                                            <i class="ri-repeat-fill"></i>
                                            </div>
                                        ) : repeatMode == 1 ? (
                                            <div onClick={() => RepeatMode(deviceId, "track")}>
                                            <i class="ri-repeat-2-fill"></i>
                                            </div>
                                        ) : (
                                            <div onClick={() => RepeatMode(deviceId, "off")}>
                                            <i class="ri-repeat-one-fill"></i>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full h-full mx-2">
                                    <span>
                                        {volume > 50 ? (
                                            <i className="ri-volume-up-line"></i>
                                        ) : volume == 0 ? (
                                            <i className="ri-volume-mute-line"></i>
                                        ) : (
                                            <i className="ri-volume-down-line"></i>
                                        )}
                                    </span>
                                    <input
                                    type="range"
                                    ref={volumeRef}
                                    className="music-slider"
                                    min={0}
                                    max={100}
                                    onMouseUp={() =>
                                        changeVolume(volumeRef.current.value, deviceId)
                                    }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full h-full text-5xl">
                            <i className="ri-heart-line"></i>
                        </div>
                    </div>
                </div>  
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
