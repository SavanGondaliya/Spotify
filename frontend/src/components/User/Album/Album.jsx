import React, { useState, useEffect, useRef, act } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play, Pause, songDuration } from "../utility/SongManipulation";
import { PlaylistDropDown } from "../Playlist/PlaylistDropDown";
import { getUserPlaylist } from "../utility/SongManipulation";
import "./style.css";
import axios from "axios";

export const AlbumDetails = () => {

  const [userPlaylists,setUserPlaylists] = useState([]);

  const playlist = async() => {
      let playlist  = await getUserPlaylist();
      setUserPlaylists(playlist)
  }

  useEffect(() => {
      playlist();
  },[])
  
  const session_details = sessionStorage.getItem("secret_key");
  const [position,setPosition] = useState({top:20, left:30});
  const [activeIndex, setActiveIndex] = useState(null);
  const addRef = useRef(null);

  const handleDropDown = (track_id) => {
    if (addRef.current) {
      const rect = addRef.current.getBoundingClientRect();
      setPosition({ top: rect.top , left: rect.left });
    }
    setActiveIndex((prev) => prev === track_id ? null : track_id);
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
      setPositionMs(0)
      Play(id, deviceId, type, positionMs);
      setIsPlay(id);
    }
  };

  useEffect(() => {
    getAlbumTracks();
    getAlbumDetails();
  }, [deviceId]);

  return (
    <div>
      {albumTracks && albumDetails && Array(albumTracks).length > 0 ? (
        <div className="flex w-full h-full">
          <div>
            <div>
              <div className="flex justify-center relative items-center container">
                <img
                  className="h-50 w-50 container_image"
                  src={albumDetails.images[0].url}
                  alt=""
                />
                <img
                  className="absolute h-20 w-20 inner_image"
                  src={albumDetails.images[0].url}
                  alt=""
                />
              </div>
            </div>
            <div onClick={() => handleMusic(albumDetails.id, "album")}>
              {currentState && currentState.paused == true ? (
                <i className="ri-pause-circle-fill"></i>
              ) : (
                <i className="ri-play-circle-fill"></i>
              )}
            </div>
          </div>
          <div className="mx-10 w-full h-full">
            {albumTracks.items.map((tracks, index) => (
              <div key={index} className="flex">
                <div
                  className="flex justify-center items-center w-full h-full"
                  onClick={() => handleMusic(tracks.id, "track")}
                >
                  {/* <div className=" absolute">
                    {isPlay == tracks.id ? (
                      <i className="ri-pause-fill"></i>
                    ) : (
                      <i className="ri-play-fill"></i>
                    )}
                  </div> */}
                  <img
                    className="w-10 h-10"
                    src={albumDetails.images[0].url}
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-white w-full h-full">
                  <p>{tracks.name}</p>
                  {albumDetails.artists.map((artist) => (
                    <div>
                      <NavLink to={`http://localhost:5173/artist/${artist.id}`}>
                        {artist.name}
                      </NavLink>
                    </div>
                  ))}
                </div>
                <div className="text-white w-full h-full">
                  <p>{songDuration(tracks.duration_ms)}</p>
                </div>
                <div className="w-full h-full">
                  <div ref={addRef} onClick={() => handleDropDown(index)} className="z-10"  style={{ top: position.top, left: position.left }}>
                    <i className="playlist_status ri-add-line text-white "></i>
                    <div className="absolute text-white"> 
                      {activeIndex === index && <PlaylistDropDown playlists={userPlaylists} track_id={tracks.id} /> }
                    </div>
                  </div>
                </div>
                <div className="w-full h-full">
                  <i className="ri-more-2-fill text-white"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
