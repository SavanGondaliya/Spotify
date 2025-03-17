import React,{useEffect} from "react";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { ArtistCategory } from "../components/User/Artists/Artists";
import { RecenltyPlayed } from "../components/User/Playler/RecentlyPlayed";
import { PlayerController } from "../components/User/Playler/Controller";
import { TopHits } from "../components/User/Artists/Tracks.jsx";
import { TrendingSong } from "../components/User/Artists/TrendingSong.jsx";
import { TopAlbum } from "../components/User/Artists/TopAlbums.jsx";

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
                            <div className="container flex flex-col w-325 h-[88%] overflow-y-scroll">
                                <div className="flex justify-around">
                                    <div className="w-[60%] h-full">    
                                        <TrendingSong  />                   
                                    </div>
                                    <div className="w-[40%] h-100 overflow-y-scroll">
                                        <RecenltyPlayed/>
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
    )
}

export default Home;