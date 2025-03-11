import React from "react";
import { NavLink } from "react-router-dom";

export const ArtistDropDown = ({artists}) => {

    
    

    return(
        <div>
            {
                artists && artists.length > 0 ? (
                    artists.map((artist) => (
                        <div>
                            <NavLink to={`http://localhost:5173/artist/${artist.id}`}>{artist.name}</NavLink>
                        </div>
                    ))
                ):(
                    <div>Loading...</div>
                )
            }
        </div>
    ) 
}