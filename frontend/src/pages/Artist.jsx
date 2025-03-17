import React from "react";
import { ArtistDetails } from "../components/User/Artists/Artist";
import { PopulterTracks } from "../components/User/Artists/PopulerTracks";
import { PlayerController } from "../components/User/Playler/Controller";
import { PopulerAlbum } from "../components/User/Artists/PopulerAlbum";
import { FeaturedAlbum } from "../components/User/Artists/Featured";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { RelatedArtist } from "../components/User/Artists/RelatedArtist";

export const Artist = () => {

    return(
        <div className="w-screen h-screen">
        <div className="flex flex-col flex-wrap w-full h-full">
            <div className="w-[100%] h-[88%]">
                <div className="flex w-full h-full">
                    <div className="w-[15%] h-full">
                        <VerticalNavbar/>
                    </div>
                    <div className="flex w-[85%] flex-wrap">
                        <div className="w-[100%] h-[10%]">
                            <HorizontalNavbar/>
                        </div>
                        <div className="flex w-[100%] h-[90%] overflow-y-scroll justify-between">
                            <div className="w-[100%] h-[90%]">
                                <ArtistDetails />
                            </div>
                            <div>
                                <div>
                                    <PopulterTracks />
                                </div>
                                <div>
                                    <PopulerAlbum />
                                </div>
                                <div>
                                    <RelatedArtist/>
                                </div>
                                <div>
                                    <FeaturedAlbum />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100%] h-[12%]">
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