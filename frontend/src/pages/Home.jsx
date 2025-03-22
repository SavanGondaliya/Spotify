import React, { useEffect } from "react";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { ArtistCategory } from "../components/User/Artists/Artists";
import RecentlyPlayed from "../components/User/Playler/RecentlyPlayed.jsx";
import { PlayerController } from "../components/User/Playler/Controller";
import { TopHits } from "../components/User/Artists/Tracks.jsx";
import { TrendingSong } from "../components/User/Artists/TrendingSong.jsx";
import { TopAlbum } from "../components/User/Artists/TopAlbums.jsx";
import MusicLoader from "../components/User/utility/Loader.jsx";

const Home = () => {
  return (
    <div className="w-screen h-screen">
        <div className="flex flex-col flex-wrap w-full h-full">
            <div className="w-[100%] h-[88%]">
                <div className="flex w-full h-full">
                    <div className="w-[15%] h-full">
                        <VerticalNavbar/>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-[100%]">
                            <HorizontalNavbar/>
                        </div>
                        <div className="flex flex-col w-325 h-[88%] overflow-y-scroll">
                            <div className="flex justify-around">
                                <div className="w-[60%] h-full">
                                    <TrendingSong  />
                                </div>
                                <div className="w-[40%] h-100 overflow-y-scroll">
                                    <RecentlyPlayed/>
                                </div>
                            </div>
                            <div className="w-full">
                                <TopHits/>
                                <ArtistCategory/>
                                <TopAlbum/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100%] h-[12%] bg-indigo-400">
                <PlayerController/>
            </div>
        </div>
    </div>
    // <div className="w-screen h-screen flex flex-col">

    //   <div className="flex flex-grow">

    //     <div className="w-[15%] h-full bg-gray-900">
    //       <VerticalNavbar />
    //     </div>

    //     <div className="flex flex-col flex-grow">
    //       <div className="w-full">
    //         <HorizontalNavbar />
    //       </div>

    //       <div className="flex flex-col flex-grow overflow-y-auto p-4">
    //         <div className="flex w-full gap-4">
    //           {/* Trending Songs Section */}
    //           <div className="w-[60%]">
    //             <TrendingSong />
    //           </div>

    //           {/* Recently Played Section */}
    //           <div className="w-[40%] h-[400px] overflow-y-scroll bg-gray-800 rounded-lg p-3">
    //             <RecenltyPlayed />
    //           </div>
    //         </div>

    //         {/* Other Sections */}
    //         <div className="w-full mt-4 space-y-4">
    //           <TopHits />
    //           <ArtistCategory />
    //           <TopAlbum />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="w-full h-[12%] bg-indigo-400 flex items-center justify-center">
    //     <PlayerController />
    //   </div>
    // </div>
  );
};

export default Home;
