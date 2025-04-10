import React, { useState } from "react";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { ArtistCategory } from "../components/User/Artists/Artists";
import RecentlyPlayed from "../components/User/Playler/RecentlyPlayed.jsx";
import { PlayerController } from "../components/User/Playler/Controller";
import { TopHits } from "../components/User/Artists/Tracks.jsx";
import { TrendingSong } from "../components/User/Artists/TrendingSong.jsx";
import { TopAlbum } from "../components/User/Artists/TopAlbums.jsx";
import { Queue } from "../components/User/Playler/Queue.jsx";

const Home = () => {

  const [isQueueVisible,setIsQueueVisible] = useState(false);   
    
  return (
  <div className="w-screen h-screen relative">
    <div className="flex flex-col w-full h-full">
      
      <div className="w-full h-[89%] flex">
      
        <div className="w-[15%] h-full">
          <VerticalNavbar />
        </div>

        <div className="w-[86%] flex flex-col">      
          <div className="w-full h-[11%]">
            <HorizontalNavbar />
          </div>
      
          <div className="flex flex-col w-full h-[89%] overflow-y-scroll relative">
            <div className="flex justify-around">
              <div className="w-[60%] h-full">
                <TrendingSong />
              </div>
              <div className="w-[40%] h-100 overflow-y-scroll">
                <RecentlyPlayed />
              </div>
              
              {isQueueVisible && (
                <div className="fixed right-0 top-17 h-[89%] w-[400px] bg-[#0c0925] shadow-lg overflow-scroll">
                  <Queue isQueueVisible={isQueueVisible} />
                </div>
              )}
            </div>
            <div className="w-full flex flex-col">
              <TopHits />
              <ArtistCategory />
              <TopAlbum />              
            </div>
          </div>
        </div>
      </div>
  
      <div className="w-full h-[12%] z-100">
        <PlayerController isQueueVisible={isQueueVisible} setIsQueueVisible={setIsQueueVisible} />
      </div>
    </div>
  </div>
  
  );
};

export default Home;
