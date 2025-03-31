import React from "react";
import { AlbumDetails } from "../components/User/Album/Album";
import { PlayerController } from "../components/User/Playler/Controller";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { useState } from "react";
import { Queue } from "../components/User/Playler/Queue";

export const Album = () => {

    const [isQueueVisible,setIsQueueVisible] = useState(false); 

    return(
        <div className="w-screen h-screen flex flex-col">
        
        <div className="flex flex-grow overflow-hidden">
        
            <div className="w-[15%] h-full bg-gray-900 flex-shrink-0">
                <VerticalNavbar />
            </div>
    
        
            <div className="flex flex-col w-[85%] h-full">        
                <div className="w-full sticky top-0 bg-white shadow-md z-10">
                    <HorizontalNavbar />
                </div>
        
                <div className="w-full flex-grow overflow-y-auto p-4">
                    <AlbumDetails />
                    
                    {isQueueVisible && (
                    <div className="fixed right-0 top-17 h-[89%] w-[400px] bg-white shadow-lg overflow-scroll">
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
    )
}