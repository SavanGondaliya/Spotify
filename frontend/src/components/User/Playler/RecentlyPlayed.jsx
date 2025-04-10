import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play, Pause } from "../utility/SongManipulation";
import { NavLink } from "react-router-dom";
import MusicLoader from "../utility/Loader";
import "./style.css";

const RecentlyPlayed = () => {
  const session_details = sessionStorage.getItem("secret_key");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [isPlay, setIsPlay] = useState(null);
  const { player, deviceId } = useWebPlayback();
  const [positionMs, setPositionMs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!player || !deviceId) return;

    const controller = new AbortController();
    const fetchRecentlyPlayed = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/recently-played?session_details=${session_details}&deviceId=${deviceId}`,
          { headers: { "Content-Type": "application/json" }, signal: controller.signal }
        );

        if (res.status === 200) {
          setRecentlyPlayed(res?.data?.items);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching recently played:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyPlayed();
    return () => controller.abort();
  }, [player, deviceId, session_details]);

  
  const filteredTracks = useMemo(() => {
    const uniqueTracks = new Map();
    recentlyPlayed.forEach((track) => {
      uniqueTracks.set(track.track.id, track);
    });
    return Array.from(uniqueTracks.values());
  }, [recentlyPlayed]);

  const handleMusic = useCallback((id, type) => {
    if (isPlay === id) {
      Pause(id, deviceId);
      setIsPlay(null);
    } else {
      if(id != isPlay){
        setPositionMs(0)
      }
      Play(id, deviceId, type, positionMs);
      setIsPlay(id);
      }
    }, [isPlay, deviceId, positionMs]);
    
  return (
    <div className="w-full max-w-3xl mt-4">
      <h1 className="text-2xl">Recently Played</h1>
      {loading ? (
        <MusicLoader />
      ) : (
        <div className="flex flex-col gap-2">
          {filteredTracks.map((track) => (
            <div key={track.track.id} className="flex items-center gap-4 rounded py-2 bg-black hover:bg-indigo-800 px-4">
              <div className="relative flex items-center justify-center w-12 h-12">
                <img className="w-full h-full rounded recently_image" src={track?.track?.album?.images[0]?.url} alt={track?.track?.name} />
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => handleMusic(track?.track?.id, "track")}>
                  {track?.track?.id === isPlay ? <i className="ri-pause-fill"></i> : <i className="ri-play-fill"></i>}
                </div>
              </div>

              <div className="flex flex-col text-white">
                <div className="font-semibold">{track.track.name}</div>
                <div className="flex text-sm">
                  {track.track.artists.map((artist, i) => (
                    <React.Fragment key={artist?.id}>
                      <NavLink to={`http://localhost:5173/artist/${artist?.id}`} className="hover:underline">
                        {artist.name}
                      </NavLink>
                      {i < track.track.artists.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;