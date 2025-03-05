import React from "react";
import { AlbumDetails } from "../components/Album/Album";
import { PlayerController } from "../components/Playler/Controller";
import VerticalNavbar from "../components/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/Navbar/HorizontalNavbar";

export const Album = () => {

    return( 
        <div>
            <div className="w-screen h-screen">
                <div className="flex flex-col flex-wrap w-full h-full">
                    <div className="w-[100%] h-[100%]">
                        <div className="flex w-full h-full">
                            <div className="w-[15%] h-full">
                                <VerticalNavbar/>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-[100%]">
                                    <HorizontalNavbar/>
                                </div>
                                <div className=" w-[100%] h-[88%] overflow-y-scroll">
                                    <AlbumDetails />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[100%] h-[12%] bg-indigo-400">
                        <PlayerController/>
                    </div>
                </div>
            </div>
        </div>
    )
}