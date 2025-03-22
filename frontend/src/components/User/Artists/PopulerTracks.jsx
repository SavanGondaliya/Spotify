import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import {
  Play,
  Pause,
  songDuration,
  addToLibrary,
  removeFromLibrary,
} from "../utility/SongManipulation";
import { getUserPlaylist } from "../utility/SongManipulation";
import { KebabDropDown } from "../utility/KebabDropDown";
import MusicLoader from "../utility/Loader";

export const PopulerTracks = () => {

  const session_details = sessionStorage.getItem("secret_key");
  const { player, deviceId } = useWebPlayback();
  const addref = useRef(null);

  const [populerTracks, setPopulerTracks] = useState();
  const [isPlay, setIsPlay] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [position, setPosition] = useState({ bottom: 0, right: -20 });
  const [currentState, setCurrentState] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const [reRender, setReRender] = useState();
  const { id } = useParams();

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

  const playlist = async () => {
    let playlist = await getUserPlaylist();
    setUserPlaylists(playlist);
  };

  const handleDropDown = (track_id) => {
    if (addref.current) {
      const rect = addref.current.getBoundingClientRect();
      setPosition({ bottom: rect.bottom, right: rect.right });
    }
    setActiveIndex((prev) => (prev === track_id ? null : track_id));
  };

  const artistTracks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/artist/top-tracks/${id}?session_details=${session_details}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPopulerTracks(response.data);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    likedSongIds();
  }, [reRender]);

  useEffect(() => {
    artistTracks();
    playlist();
    likedSongIds();
  }, [deviceId, id]);

  useEffect(() => {
    if (!player) return;
    player.getCurrentState().then((state) => {
      if (!state) {
        return;
      }
      setCurrentState(state);
      setPositionMs(state.position);
    });
  }, [isPlay]);

  const handleMusic = (id, type) => {
    if (isPlay == id) {
      Pause(id, deviceId);
      setIsPlay(null);
    } else {
      Play(id, deviceId, type, positionMs);
      setIsPlay(id);
    }
  };
  
  return populerTracks && populerTracks?.tracks.length > 0 ? (
    
    <div className="w-full h-100 overflow-y-scroll m-5">
      <h1 className="text-white text-2xl mb-4">Populer Tracks</h1>
      <div>
        {populerTracks?.tracks?.map((track, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-3 hover:bg-indigo-600 rounded-md"
          >
            {/* Track Number */}
            <div className="w-1/12 text-center">
              <h3>{index + 1}</h3>
            </div>

            {/* Album Image & Play Button */}
            <div
              className="w-2/12 flex justify-center items-center cursor-pointer"
              onClick={() => handleMusic(track.id, "track")}
            >
              <img
                className="w-12 h-12 rounded populer_image"
                src={track?.album?.images[0]?.url}
                alt=""
              />
            </div>

            {/* Track Name */}
            <div className="w-4/12">
              <p className="highlight__text text-white">{track?.name}</p>
            </div>

            {/* Duration */}
            <div className="w-2/12">
              <p className="text-white">{songDuration(track?.duration_ms)}</p>
            </div>

            {/* Save/Remove from Library */}
            <div className="w-1/12 flex justify-center">
              {savedTracks && savedTracks.includes(track?.id) ? (
                <div
                className="cursor-pointer"
                  onClick={() => {
                    removeFromLibrary(track?.id);
                    setReRender((prev) =>
                      prev === track?.id ? null : track?.id
                    );
                  }}
                >
                  <i className="ri-checkbox-circle-fill"></i>
                </div>
              ) : (
                <div
                className="cursor-pointer"
                  onClick={() => {
                    addToLibrary(track?.id);
                    setReRender((prev) =>
                      prev === track?.id ? null : track?.id
                    );
                  }}
                >
                  <i className="playlist_status ri-add-line text-white"></i>
                </div>
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
                  <div className="absolute text-white right-10 bottom-0">
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
        ))}
      </div>
    </div>
//     <div className="w-full h-[500px] overflow-y-auto mx-5 p-4 bg-gray-900 rounded-lg">
//   <h1 className="text-white text-2xl mb-4">Populer Tracks</h1>

//   <div className="space-y-2">
//     {populerTracks?.tracks?.map((track, index) => (
//       <div
//         key={index}
//         className="flex items-center px-4 py-3 hover:bg-indigo-600 rounded-md"
//       >
//         {/* Track Number */}
//         <div className="w-1/12 text-center text-white">{index + 1}</div>

//         {/* Album Image & Play Button */}
//         <div
//           className="w-2/12 flex justify-center items-center cursor-pointer"
//           onClick={() => handleMusic(track.id, "track")}
//         >
//           <img
//             className="w-14 h-14 rounded-md shadow-md"
//             src={track?.album?.images[0]?.url}
//             alt={track?.name}
//           />
//         </div>

//         {/* Track Name */}
//         <div className="w-4/12">
//           <p className="text-white truncate">{track?.name}</p>
//         </div>

//         {/* Duration */}
//         <div className="w-2/12 text-center text-white">
//           {songDuration(track?.duration_ms)}
//         </div>

//         {/* Save/Remove from Library */}
//         <div className="w-1/12 flex justify-center">
//           {savedTracks && savedTracks.includes(track?.id) ? (
//             <div
//               className="cursor-pointer text-green-400"
//               onClick={() => {
//                 removeFromLibrary(track?.id);
//                 setReRender((prev) =>
//                   prev === track?.id ? null : track?.id
//                 );
//               }}
//             >
//               <i className="ri-checkbox-circle-fill"></i>
//             </div>
//           ) : (
//             <div
//               className="cursor-pointer text-white"
//               onClick={() => {
//                 addToLibrary(track?.id);
//                 setReRender((prev) =>
//                   prev === track?.id ? null : track?.id
//                 );
//               }}
//             >
//               <i className="ri-add-line"></i>
//             </div>
//           )}
//         </div>

//         {/* More Options */}
//         <div className="w-1/12 relative flex justify-center">
//           <div ref={addref} onClick={() => handleDropDown(index)} className="cursor-pointer">
//             <i className="ri-more-2-fill text-white"></i>
//             {activeIndex === index && (
//               <div className="absolute text-white right-10 bottom-0 bg-gray-800 rounded shadow-lg">
//                 <KebabDropDown
//                   playlists={userPlaylists}
//                   artists={track?.artists}
//                   track_id={track?.id}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

  ) : (
    <div>
      <MusicLoader />
    </div>
  );
};
