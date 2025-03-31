import React from "react";
import  KPOP from "./KPOP";
import { TopBollywood } from "./TopBollywood";
import { TopHollywood } from "./TopEnglish";
import { NewArtist } from "./NewArtist";


export const ArtistCategory = () => {

    return(
        <div className="flex flex-col gap-y-6">
            <NewArtist />
            <TopBollywood />
            <TopHollywood />
            <KPOP />
        </div>
    )
}