import React from "react";
import { ArtistDetails } from "../components/Artists/Artist";
import { PopulterTracks } from "../components/Artists/PopulerTracks";
import { PlayerController } from "../components/Playler/Controller";

export const Artist = () => {

    return(
        <div className="flex">

            <div className="flex flex-col">
                <ArtistDetails />
                <PlayerController />
            </div>
            <div>
                <PopulterTracks />
            </div>
            
        </div>
    )
}