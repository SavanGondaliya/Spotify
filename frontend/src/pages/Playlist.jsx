import React from "react";
import { Playlist } from "../components/User/Playlist/Playlist";
import { PlayerController } from "../components/User/Playler/Controller";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";

export const PlaylistPage = () => {

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
                        <div className="container flex flex-col w-325 h-[88%] overflow-y-scroll">
                            <Playlist/>
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