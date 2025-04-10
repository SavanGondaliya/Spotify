import React from "react";
import { Playlist } from "../components/User/Playlist/Playlist";
import { PlayerController } from "../components/User/Playler/Controller";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import { Queue } from "../components/User/Playler/Queue";
import { useState } from "react";

export const PlaylistPage = () => {

    const [isQueueVisible,setIsQueueVisible] = useState(false);     

    return(
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
                            <Playlist/>
                        </div>
                        {isQueueVisible && (
                            <div className="fixed right-0 top-17 h-[89%] w-[400px] bg-[#0c0925] shadow-lg overflow-scroll">
                                <Queue isQueueVisible={isQueueVisible} />
                            </div>
                        )}
                            
                    </div>
                </div>
            </div>
            <div className="w-full h-[12%] z-100">
                <PlayerController isQueueVisible={isQueueVisible} setIsQueueVisible={setIsQueueVisible} />
            </div>
        </div>
    </div>
    )
}