import React from "react";
import  KPOP from "./KPOP";
import { Bollywood } from "./Bollywood";
import { TopBollywood } from "./TopBollywood";
import { TopHollywood } from "./TopEnglish";

export const ArtistCategory = () => {

    return(
        <div>
            <div>
                <KPOP/>
            </div>
            <div>
                <Bollywood />
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