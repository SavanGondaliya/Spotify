import React from "react";
import { NavLink } from "react-router-dom";

export const ArtistDropDown = ({ artists }) => {
    return (
        <div className="bg-gray-800 p-2 rounded-md shadow-md z-10">
            {artists && artists.length > 0 ? (
                artists.map((artist) => (
                    <div key={artist.id} className="hover:bg-gray-700 p-2 rounded-md">
                        <NavLink to={`/artist/${artist.id}`} className="text-white">
                            {artist.name}
                        </NavLink>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};
