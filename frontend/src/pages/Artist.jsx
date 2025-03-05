import React from "react";
import { ArtistDetails } from "../components/Artists/Artist";
import { PopulterTracks } from "../components/Artists/PopulerTracks";
import { PlayerController } from "../components/Playler/Controller";
import { PopulerAlbum } from "../components/Artists/PopulerAlbum";
import { FeaturedAlbum } from "../components/Artists/Featured";
import VerticalNavbar from "../components/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/Navbar/HorizontalNavbar";
import { RelatedArtist } from "../components/Artists/RelatedArtist";

export const Artist = () => {

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
                        <div className="flex w-[100%] h-[88%] overflow-y-scroll bg-black">
                            <div className="w-[100%] h-[100%]">
                                <ArtistDetails />
                            </div>
                            <div>
                                <PopulterTracks />
                                <PopulerAlbum />
                                <RelatedArtist/>
                                <FeaturedAlbum />
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
  
        // <div className="flex">
        //     <div className="flex flex-col">
        //         <PlayerController />
        //     </div>
        //     <div>
        //         
        //     </div>           
        // </div>
    )
}