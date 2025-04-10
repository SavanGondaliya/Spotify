import React from "react";
import { NavLink } from "react-router-dom";
import MusicLoader from "./Loader";

export const ArtistDropDown = ({ artists }) => {
    return (
        <div className="bg-indigo-800 p-2 rounded-md shadow-md z-10">
            {artists && artists.length > 0 ? (
                artists.map((artist) => (
                    <div key={artist.id} className="hover:bg-indigo-700 p-2 rounded-md">
                        <NavLink to={`/artist/${artist.id}`} className="text-white">
                            {artist.name}
                        </NavLink>
                    </div>
                ))
            ) : (
                <div><MusicLoader /></div>
            )}
        </div>
    );
};
