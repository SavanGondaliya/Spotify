import React, { useState, useEffect, useRef, act } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import {
  Play,
  Pause,
  songDuration,
  addToLibrary,
  removeFromLibrary,
} from "../utility/SongManipulation";
import { KebabDropDown } from "../utility/KebabDropDown";
import { getUserPlaylist } from "../utility/SongManipulation";
import MusicLoader from "../utility/Loader";
import "./style.css";
import axios from "axios";

export const AlbumDetails = () => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  
  const playlist = async () => {
    let playlist = await getUserPlaylist();
    setUserPlaylists(playlist);
  };
  
  useEffect(() => {
    playlist();
  }, []);
  
  const session_details = sessionStorage.getItem("secret_key");
  
  const [activeIndex, setActiveIndex] = useState(null);
  const [savedTracks, setSavedTracks] = useState([]);
  const addRef = useRef(null);
  
  const handleDropDown = (track_id) => {
    setActiveIndex((prev) => (prev === track_id ? null : track_id));
  };
  
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("playlist_status")) {
      setActiveIndex(null);
    }
  });
  
  const [albumTracks, setAlbumTracks] = useState();
  const [albumDetails, setAlbumDetails] = useState();
  const [currentState, setCurrentState] = useState();
  const { player, deviceId } = useWebPlayback();
  const [positionMs, setPositionMs] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const { id } = useParams();
  const [albumDuration, setAlbumDuration] = useState(0);
  
  const getAlbumTracks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/album/tracks/${id}?session_details=${session_details}&deviceId=${deviceId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAlbumTracks(response.data);
      }
    } catch (error) {
      return error;
    }
  };

  const getAlbumDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/album/${id}?session_details=${session_details}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAlbumDetails(response.data);
      }
    } catch (error) {
      return error;
    }
  };

  const likedSongIds = () => {
    try {
      console.log("liked Ids Called...");
      
      const url = `http://localhost:5000/track/saved_tracks?session_details=${session_details}`;

      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setSavedTracks(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return error;
    }
  };
  console.log(savedTracks);
  
  useEffect(() => {
    if (!player) return;
    player.addListener("ready", () => {
      player.getCurrentState().then((state) => {
        if (!state) {
          return;
        }
        setPositionMs(state.position);
        setCurrentState(state);
      });
    });
  }, [player]);

  const handleMusic = (id, type) => {
    if (isPlay == id) {
      Pause(id, deviceId);
      setIsPlay(null);
    } else {
      setPositionMs(0);
      Play(id, deviceId, type, positionMs);
      setIsPlay(id);
    }
  };
  
  
  const funcAlbumDuration = (position) => {
    
  let hour = Math.floor((position/1000) / 3600)
  let minute = Math.floor((position/1000) % 3600/60)
  
  return `${hour} hour : ${minute < 10 ? '0'+minute:minute} minutes`  
  }


  useEffect(() => {
    if (albumTracks) {

      let totalDuration = 0;
      albumTracks?.items?.forEach((album) => {
        totalDuration += album?.duration_ms || 0;
      });
      setAlbumDuration(totalDuration);
    }
  }, [albumTracks]);
  useEffect(() => {
    likedSongIds();
  },[]);

  useEffect(() => {
    getAlbumTracks();
    getAlbumDetails();
  }, [deviceId]);

  return (
    <div>
      {albumTracks && albumDetails && Array(albumTracks).length > 0 ? (
        <div className="flex w-full h-full">
          <div className="w-[40%] h-fit p-4 rounded-xl shadow-lg">
            <div className="relative flex justify-center items-center __album_shadow__">
              <img
                className="h-full w-full rounded shadow-md opacity-20"
                src={albumDetails.images[0].url}
                alt="Album Cover"
              />
              <img
                className="absolute h-30 w-30 shadow-lg __inner_album_shadow__"
                src={albumDetails.images[0].url}
                alt="Inner Cover"
              />
            </div>
            <div className="flex items-center justify-center">
              <div
                className="flex justify-center mt-4 cursor-pointer"
                onClick={() => handleMusic(albumDetails.id, "album")}
              >
                {currentState && currentState.paused ? (
                  <i className="ri-pause-circle-fill text-4xl text-[#f2c178]"></i>
                ) : (
                  <i className="ri-play-circle-fill text-4xl text-[#f2c178]"></i>
                )}
              </div>

              <div className="text-start mt-4">
                <span className="text-gray-400 text-sm uppercase">{albumDetails?.name}</span><br/>
                <span className="text-md mx-2  text-white">
                  Album
                </span>
                <span className="text-md  text-white">
                  {albumTracks?.items?.length} Tracks
                </span>
                <span className="mx-2">{funcAlbumDuration(albumDuration)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-325 h-[88%] overflow-y-scroll">
            <div className="overflow-auto w-full h-screen p-5">
              {albumTracks.items.length > 0 ? (
                albumTracks.items.map((track, index) => (
                  <div
                    key={track.id}
                    className="w-full flex items-center justify-between p-3 _favourite_row_ cursor-pointer transition rounded-lg"
                  >
                    <div className="relative w-16 h-16">
                      <img
                        className="w-full h-full rounded-md object-cover __music_image__"
                        src={albumDetails.images[0].url}
                        alt={track.name}
                      />
                      <i
                        onClick={() => handleMusic(track.id, "track")}
                        className="text-4xl cursor-pointer text-white absolute inset-0 flex items-center justify-center rounded-md hover:ri-play-circle-fill"
                      ></i>
                    </div>

                    <div className="flex flex-col w-1/3 px-4">
                      <h1 className="text-white text-lg font-semibold truncate">
                        {track.name}
                      </h1>
                      <p className="text-gray-400 text-sm truncate">
                        {albumDetails.artists.map((artist, i) => (
                          <React.Fragment key={artist.id}>
                            <NavLink
                              to={`/artist/${artist.id}`}
                              className="hover:underline"
                            >
                              {artist.name}
                            </NavLink>
                            {i < albumDetails.artists.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>

                    <div className="w-1/6 text-center">
                      <b className="text-white">
                        {songDuration(track.duration_ms)}
                      </b>
                    </div>

                    <div className="w-1/12 text-center">
                      {savedTracks?.includes(track.id) ? (
                        <i
                          className="ri-checkbox-circle-fill text-xl cursor-pointer"
                          onClick={async () => {
                            await removeFromLibrary(track.id);
                            setSavedTracks((prev) =>
                              prev.filter((id) => id !== track.id)
                            );
                          }}
                        ></i>
                      ) : (
                        <i
                          className="ri-add-line text-white text-xl cursor-pointer"
                          onClick={async () => {
                            await addToLibrary(track.id);
                            setSavedTracks((prev) => [...prev, track.id]);
                          }}
                        ></i>
                      )}
                    </div>

                    <div className="w-1/12 relative flex justify-center">
                      <div
                        ref={addRef}
                        onClick={() => handleDropDown(index)}
                        className="cursor-pointer"
                      >
                        <i className="ri-more-2-fill text-white"></i>
                        {activeIndex === index && (
                          <div className="absolute right-15 top-0 mt-2 bg-indigo-900 shadow-lg rounded-lg z-10">
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
                <MusicLoader />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <MusicLoader />
        </div>
      )}
      <style>
        {
          `
            .__inner_album_shadow__{
              box-shadow: 5px 5px 0px #f2c178;
            }
            .__music_image__{
              box-shadow: 5px 5px 0px #4949bf;
            }
            .__album_shadow__{
              box-shadow: 5px 5px 0px #4949bf;
              border-radius : 5px;
            }
          `
        }
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