import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { PlayerController } from "../components/User/Playler/Controller";
import {
  Play,
  Pause,
  songDuration,
} from "../components/User/utility/SongManipulation";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import { KebabDropDown } from "../components/User/utility/KebabDropDown";
import { getUserPlaylist } from "../components/User/utility/SongManipulation";
import {
  addToLibrary,
  removeFromLibrary,
} from "../components/User/utility/SongManipulation";
import MusicLoader from "../components/User/utility/Loader";
import useWebPlayback from "../components/User/utility/WebPlayBackSDK";
import { Queue } from "../components/User/Playler/Queue";

export const LikedSongs = () => {
  const addref = useRef();
  const { player, deviceId } = useWebPlayback();
  const session_details = sessionStorage.getItem("session_details");
  const [favourite, setFavourite] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [positionMs, setPositionMs] = useState(0);
  const [activeIndex, setActiveIndex] = useState();
  const [currentlyPlaying, setCurrentlyPlaying] = useState();
  const [isPlay, setIsPlay] = useState(null);
  const [isQueueVisible,setIsQueueVisible] = useState(false); 

  const playlist = async () => {
    let playlist = await getUserPlaylist();
    setUserPlaylists(playlist);
  };

  const handleDropDown = (track_id) => {
    setActiveIndex((prev) => (prev === track_id ? null : track_id));
  };

  const likedSongIds = async () => {
    try {
      const url = `http://localhost:5000/track/saved_tracks?session_details=${session_details}`;
      const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        setFavourite(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likedSongs = () => {
    try {
      axios
        .get(
          `http://localhost:5000/tracks?ids=${favourite.join(
            ","
          )}&session_details=${session_details}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setTracks(res.data);
          }
        })
        .catch((err) => {
          setTracks(err);
        });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    likedSongIds();
    playlist();
  }, []);

  useEffect(() => {
    if (favourite.length > 0) {
      likedSongs();
    }
  }, [favourite]);

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
      setPositionMs(state.position);
      localStorage.setItem("player_details", JSON.stringify(state));
    });
    return () =>
      player.removeListener("player_state_changed", handlePlayerStateChange);
  }, [player]);

  const handleMusic = (id, type) => {
    if (isPlay == id) {
      Pause(id, deviceId, type);
      setIsPlay(null);
    } else {
      if (id != isPlay) {
        setPositionMs(0);
      }
      Play(id, deviceId, type, positionMs);
      setIsPlay(id);
    }
  };
  
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col flex-wrap w-full h-full">
        <div className="w-[100%] h-[88%]">
          <div className="flex w-full h-full">
            <div className="w-[15%] h-full">
              <VerticalNavbar />
            </div>
            <div className="flex flex-wrap">
              <div className="w-[100%]">
                <HorizontalNavbar />
              </div>
              <div className="flex flex-col w-325 h-[88%] overflow-y-scroll p-4">
                {tracks && tracks?.tracks?.length > 0 ? (
                  tracks?.tracks?.map((track, index) => (
                    <div
                      key={track.id}
                      className="w-full flex items-center justify-between p-3 _favourite_row_ cursor-pointer  transition rounded-lg"
                    >
                      <div className="relative w-16 h-16">
                        {/* Track Image */}
                        <img
                          className="w-full h-full rounded-md object-cover _facourite_image_"
                          src={track?.album?.images[0]?.url}
                          alt={track?.name}
                        />

                        <i
                          onClick={() =>
                            handleMusic(track?.id, "track", positionMs)
                          }
                          className={`text-4xl cursor-pointer text-white transition-opacity duration-300 opacity-0 hover:opacity-10
                            absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md ${
                              currentlyPlaying?.paused
                                ? "ri-play-circle-fill"
                                : "ri-pause-circle-fill"
                            }`}
                        ></i>
                      </div>

                      <div className="flex flex-col w-1/3 px-4">
                        <h1 className="text-white text-lg font-semibold truncate">
                          {track?.name}
                        </h1>
                        <p className="text-gray-400 text-sm truncate">
                          {track?.artists
                            ?.map((artist) => artist?.name)
                            .join(", ")}
                        </p>
                      </div>

                      {/* Album Name */}
                      <div className="w-1/4 px-4">
                        <h1 className="text-gray-300 text-sm truncate">
                          {track?.album?.name}
                        </h1>
                      </div>

                      {/* Duration */}
                      <div className="w-1/6 text-center">
                        <b className="text-white">
                          {songDuration(track?.duration_ms)}
                        </b>
                      </div>

                      {/* Favourite Icon */}
                      <div className="w-1/12 text-center">
                        {favourite?.includes(track.id) ? (
                          <i
                            className="ri-checkbox-circle-fill text-xl cursor-pointer"
                            onClick={async () => {
                              await removeFromLibrary(track.id);
                              likedSongIds();
                            }}
                          ></i>
                        ) : (
                          <i
                            className="ri-add-line text-white text-xl cursor-pointer"
                            onClick={async () => {
                              await addToLibrary(track.id);
                              likedSongIds();
                            }}
                          ></i>
                        )}
                      </div>

                      <div className="w-1/12 relative flex justify-center">
                        <div
                          ref={addref}
                          onClick={() => handleDropDown(index)}
                          className="cursor-pointer"
                        >
                          <i className="ri-more-2-fill text-white"></i>
                          {activeIndex === index && (
                            <div className="absolute right-15 top-0 mt-2 bg-gray-900 shadow-lg rounded-lg z-10">
                              <KebabDropDown
                                playlists={userPlaylists}
                                artists={track?.artists}
                                track_id={track?.id}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center">
                    <MusicLoader />
                  </div>
                )}
                {isQueueVisible && (
                <div className="fixed right-0 top-17 h-[89%] w-[400px] bg-white shadow-lg overflow-scroll">
                    <Queue isQueueVisible={isQueueVisible} />
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[12%] z-100">
            <PlayerController isQueueVisible={isQueueVisible} setIsQueueVisible={setIsQueueVisible} />
        </div>
      </div>
      <style>
        {`
            ._facourite_image_{
              box-shadow: 5px 5px 0px #4949bf
            }
            ._favourite_row_:hover{
              background-color: #282870;
            }
          `}
      </style>
    </div>
  );
};
/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */
