import React, { useState, useEffect } from "react";
import { Currently } from "../components/Playler/CurrentPlaying";
import { PlayerController } from "../components/Playler/Controller";
import HorizontalNavbar from "../components/Navbar/HorizontalNavbar";
import VerticalNavbar from "../components/Navbar/VerticalNavbar";
import { Lyrics } from "../components/Playler/Lyrics";
import { useWebPlayback } from "../components/utility/WebPlayBackSDK";

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
    });
    return () =>
      player.removeListener("player_state_changed", handlePlayerStateChange);
  }, [player]);
  console.log(currentState);
  
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col flex-wrap w-full h-full">
        <div className="w-[100%] h-[100%]">
          <div className="flex w-full h-full">
            <div className="w-[15%] h-full">
              <VerticalNavbar />
            </div>
            <div className="flex flex-wrap">
              <div className="w-[100%]">
                <HorizontalNavbar />
              </div>
              <div className="container flex flex-col w-300 h-[100%] overflow-y-scroll">
                <Currently />
                {
                    currentState  ? (
                        <Lyrics
                        artist_name={currentState.artists}
                        song_name={currentState.name}
                        />
                    ):(
                        <div>Loading....</div>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
