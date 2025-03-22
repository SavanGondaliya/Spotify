import React from "react";
import { AlbumDetails } from "../components/User/Album/Album";
import { PlayerController } from "../components/User/Playler/Controller";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";

export const Album = () => {

    return( <div className="w-screen h-screen flex flex-col">
        
        <div className="flex flex-1">
    
            <div className="w-[15%] h-full flex-shrink-0">
                <VerticalNavbar />
            </div>
    
            <div className="flex flex-col w-[85%] h-full">
                <div className="w-full">
                    <HorizontalNavbar />
                </div>
    
                <div className="w-full flex-1 h-0 overflow-y-scroll">
                    <AlbumDetails />
                </div>
            </div>
        </div>
    
        <div className="w-full h-[12%]">
            <PlayerController />
        </div>
    </div>
    
    )
}