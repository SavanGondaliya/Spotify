import React,{useEffect} from "react";
import VerticalNavbar from "../components/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/Navbar/HorizontalNavbar";
import { ArtistCategory } from "../components/Artists/Artists";
import { RecenltyPlayed } from "../components/Playler/RecentlyPlayed";
import { PlayerController } from "../components/Playler/Controller";
import { TopHits } from "../components/Artists/Tracks.jsx";

const Home = () => {

    const session_details = sessionStorage.getItem("session_details");

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
                                        <h1>Trending Songs</h1>
                                    </div>
                                    <div className="w-[40%] h-100 overflow-y-scroll">
                                        <RecenltyPlayed/>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <TopHits/>
                                    <ArtistCategory/>
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