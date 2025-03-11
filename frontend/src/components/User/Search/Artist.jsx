import React from "react";
import { NavLink } from "react-router-dom";

export const Artists = (artists) => {
  return (
    <div>
      {/* {
                artists && artists.artists.length > 0 ? (
                    <div>
                        {
                            artists.artists.map((artist) => (
                                <NavLink to={`http://localhost:5173/artist/${artist.id}`}>
                                    <img src={artist?.images[0]?.url} alt="" />
                                    <h1 className="text-amber-100">{artist.name}</h1>
                                </NavLink>
                            ))
                        }
                    </div>
                ):(
                    <div></div>
                )
            } */}
      <div className="flex flex-col justify-center items-center px-5 py-5">
        <div className="flex w-fit h-fit py-5">
          {artists && artists.artists.length > 0 ? (
            artists.artists.map((artist) => (
              <NavLink
                to={`http://localhost:5173/artist/${artist.id}`}
                key={artist.id}
                className="w-full h-full flex flex-col justify-center items-center rounded_image hover_card"
              >
                <div className="mx-5 py-5">
                  <div className="w-full h-full">
                    <img
                      className="w-20 h-20 object-cover shadow-lg  album_shadow rounded_image"
                      src={artist?.images[0]?.url}
                      alt=""
                    />
                  </div>
                  <div className="w-full h-full text-amber-100 my-2">
                    <h1 className="text-center">{artist?.name}</h1>
                    <h1 className="text-center">Artist</h1>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};
