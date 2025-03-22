import axios from "axios";
import React,{useEffect,useState,useRef} from "react";
import {  useParams } from "react-router-dom";
import { Play,Pause,songDuration,getCurrentState,deleteFromPlaylist } from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { KebabDropDown } from "../utility/KebabDropDown";
import { getUserPlaylist } from "../utility/SongManipulation";
import { addToLibrary,removeFromLibrary } from "../utility/SongManipulation";
import MusicLoader from "../utility/Loader";
import { NavLink } from "react-router-dom";

export const Playlist = () => {

    const session_details = sessionStorage.getItem("session_details");
    const {playlist_id} = useParams();
    const {player,deviceId} = useWebPlayback();
    const [isPlay,setIsPlay] = useState(null);
    const [positionMs,setPositionMs] = useState(0);
    const [currentlyPlaying,setCurrentlyPlaying] = useState();
    const [playlistTracks,setplayListTracks] = useState();
    const [playlistTrackIds,setplayListTrackIds] = useState("");
    const addref = useRef();
    const [savedTracks, setSavedTracks] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [position, setPosition] = useState({ bottom: 0, right: 0 });
    const [activeIndex, setActiveIndex] = useState();
    
    const playlist = async () => {
    let playlist = await getUserPlaylist();
    setUserPlaylists(playlist);
    };

    const handleDropDown = (track_id) => {
    if (addref.current) {
        const rect = addref.current.getBoundingClientRect();
        setPosition({
        bottom: window.innerHeight - rect.bottom,
        right: window.innerWidth - rect.right,
        });
    }
    setActiveIndex((prev) => (prev === track_id ? null : track_id));
    };


    const getPlaylistTracks = async() => {
        try {
            
            const response = await axios.get(`http://localhost:5000/playlist/${playlist_id}/tracks?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                setplayListTrackIds(response.data[0].song_id)
            }
        } catch (error) {
            return error
        }
    }

    const getTrackdetails = async() => {
        try {

            const response = await axios.get(`http://localhost:5000/tracks?ids=${playlistTrackIds}&session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });

            if(response.status === 200){
                setplayListTracks(response.data)
            }

        } catch (error) {
            return error;
        }
    }

    const handleMusic = (id, type) => {
        if (isPlay == id) {
            Pause(id, deviceId);
            setIsPlay(null);
        } else {
            Play(id, deviceId, type, positionMs);
            setIsPlay(id);
        }
    };

    useEffect(() => {getPlaylistTracks();},[playlist_id])
    useEffect(() => {getTrackdetails();},[playlistTrackIds])
    useEffect(() => {
        if (!player) return;
        player.addListener("ready", () => {
          player.getCurrentState().then((state) => {
            if (!state) {
              return;
            }
            setPositionMs(state.position);
            setCurrentlyPlaying(state);
          });
        });
    }, [player]);
            
    const getTracks = () => {
      const url = `http://localhost:5000/music?session_details=${session_details}`;
      try {
        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setTracks(res.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        return error;
      }
    };
  
    const likedSongIds = () => {
      try {
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
  
    useEffect(() => {
      likedSongIds();
      getTracks();
      playlist();
    },[]);
  
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
  

    return (
        <div className="overflow-auto w-full h-screen p-5">
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
                    onClick={() => handleMusic(track?.id, "track", positionMs)}
                    className={`text-4xl cursor-pointer text-white 
                      absolute inset-0 flex items-center justify-center rounded-md hover:${currentlyPlaying?.paused ? "ri-play-circle-fill" : "ri-pause-circle-fill"}`}
                  >
                  </i>
                </div>

                  <div className="flex flex-col w-1/3 px-4">
                    <h1 className="text-white text-lg font-semibold truncate">
                      {track?.name}
                    </h1>
                    <p className="text-gray-400 text-sm truncate">
                       {track?.artists?.map((artist, i) => (
                            <React.Fragment key={artist?.id}>
                              <NavLink to={`/artist/${artist?.id}`} className="hover:underline">
                                {artist?.name}
                              </NavLink>
                              {i < track.artists.length - 1 && ", "}
                            </React.Fragment>
                          ))}
                    </p>
                  </div>

                  {/* Album Name */}
                  <NavLink to={`http://localhost:5173/album/${track?.album?.id}`}  className="w-1/4 px-4">
                    <h1 className="text-gray-300 text-sm truncate">
                      {track?.album?.name}
                    </h1>
                  </NavLink >

                  {/* Duration */}
                  <div className="w-1/6 text-center">
                    <b className="text-white">
                      {songDuration(track?.duration_ms)}
                    </b>
                  </div>

                  {/* Favourite Icon */}
                  <div className="w-1/12 text-center">
                    {savedTracks?.includes(track.id) ? (
                      <i
                        className="ri-check-fill text-xl cursor-pointer"
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


                  {/* More Options Dropdown */}
                  <div className="relative w-1/12 text-center">
                    <i
                      className="ri-more-2-fill text-white text-xl cursor-pointer"
                      onClick={() => handleDropDown(index)}
                    ></i>
                    {activeIndex === index && (
                      <div className="absolute right-0 mt-2 bg-gray-900 shadow-lg rounded-lg z-10">
                        <KebabDropDown
                          playlists={userPlaylists}
                          artists={track.artists}
                          tracks_id={track.id}
                        />
                      </div>
                    )}
                  </div>
              </div>
            ))):(
              <MusicLoader/>
            )
          }
        </div>           
    );
}


