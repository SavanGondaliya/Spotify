import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import useWebPlayback from "../utility/WebPlayBackSDK";
import MusicLoader from "../utility/Loader";

export const Queue = () => {
  const [currentQueue, setCurrentQueue] = useState([]);
  const [currentlyPlaying,setCurrentlyPlaying] =  useState([]);
  const session_details = sessionStorage.getItem("session_details");
  const {player,deviceId} = useWebPlayback();

  const getQueue = () => {
    const url = `http://localhost:5000/queue?session_details=${session_details}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrentQueue(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
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
    getQueue();
  },[])

  useEffect(() => {
    getQueue();
  }, [currentlyPlaying]);
  

  return (
    <div className="w-full bg-[#0c0925] p-4 shadow-lg">
    {currentQueue && currentQueue?.queue?.length > 0 ? (       
      <div className="space-y-4">
        {currentQueue?.queue.map((track, i) => (
          <div key={track?.id || i} className="flex items-center gap-3 p-2 bg-indigo-800 rounded">
            
            {/* Album Cover */}
            <div className="w-12 h-12 flex-shrink-0">
              <img
                src={track?.album?.images?.[0]?.url}
                alt="Album Cover"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
  
            {/* Song & Artist Info */}
            <div className="flex-1">
              <p className="text-white font-semibold truncate">{track?.name}</p>
              <div className="text-[#f2c178] text-sm truncate">
                {track?.artists.map((artist, i) => (
                  <React.Fragment key={artist?.id}>
                    {artist.name}
                    {i < track?.artists.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : currentQueue ? (
      <MusicLoader />
    ) : (
      <div className="text-white text-center text-sm italic">Queue is Empty</div>
    )}
  </div>
  
  );
};
