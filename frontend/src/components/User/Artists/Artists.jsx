import React from "react";
import  KPOP from "./KPOP";
import { TopBollywood } from "./TopBollywood";
import { TopHollywood } from "./TopEnglish";
import { NewArtist } from "./NewArtist";


export const ArtistCategory = () => {

    return(
        <div>
            <div>
                <KPOP/>
            </div>
            <div>
                <NewArtist />
            </div>
            <div>
                <TopBollywood/>
            </div>
            <div>
                <TopHollywood/>
            </div>
        </div>
    )
}