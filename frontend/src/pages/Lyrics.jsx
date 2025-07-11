import React, { useState, useEffect } from "react";
import { Currently } from "../components/User/Playler/CurrentPlaying";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import { Lyrics } from "../components/User/Playler/Lyrics";
import { useWebPlayback } from "../components/User/utility/WebPlayBackSDK";
import MusicLoader from "../components/User/utility/Loader";

export const LyricsPage = () => {

  const { player, deviceId } = useWebPlayback();
  const [currentState, setCurrentState] = useState();

  useEffect(() => {
    if (!player) return;

    const handlePlayerStateChange = (state) => {
      if (!state) {
        return;
      }
      setCurrentState(state.track_window.current_track);
    };

    player.addListener("player_state_changed", handlePlayerStateChange);

    player.getCurrentState().then((state) => {
      if (!state) {
        return;
      }
      setCurrentState(state.track_window.current_track);
      localStorage.setItem("player_details", JSON.stringify(state));
    });
    return () =>
      player.removeListener("player_state_changed", handlePlayerStateChange);
  }, [player]);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
  
  <div className="w-[15%] min-w-[200px] h-full bg-gray-900">
    <VerticalNavbar />
  </div>

  
  <div className="flex flex-col flex-1 h-full">
  
    <div className="h-[8%] w-full sticky top-0 bg-gray-800 shadow-md z-10">
      <HorizontalNavbar />
    </div>

    <div className="flex flex-col w-full h-[92%] overflow-y-auto p-6 space-y-6">

      <div className="w-full">
        <Currently />
      </div>

      <div className="w-full rounded  p-4 shadow-md">
        {currentState ? (
          <Lyrics
            artist_name={currentState?.artists}
            song_name={currentState?.name}
          />
        ) : (
          <div className="text-center text-gray-500">
            <MusicLoader />
          </div>
        )}
      </div>
    </div>
  </div>
    </div>

  );
};
