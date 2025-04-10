import React from "react";
import { NavLink } from "react-router-dom";
import MusicLoader from "../utility/Loader";

export const Albums = (albums) => {
  return (
    <div>
      <div className="px-5 py-5">
      <h1 className="mx-10 text-2xl">Albums</h1>
        <div className="flex flex-col justify-center items-center ">
          <div className="flex w-fit h-fit py-5">
            {albums && albums.albums.length > 0 ? (
              albums.albums.map((album) => (
                <NavLink
                  to={`http://localhost:5173/album/${album.id}`}
                  key={album.id}
                  className="w-full h-full flex flex-col justify-center items-center rounded_image hover_card"
                >
                  <div className="mx-5 py-5">
                    <div className="w-full h-full">
                      <img
                        className="w-20 h-20 object-cover shadow-lg album_shadow rounded"
                        src={album?.images[0]?.url}
                        alt=""
                      />
                    </div>
                    <div className="w-full h-full text-amber-100 my-2">
                      <h1 className="text-center">{album.name}</h1>
                      <h1 className="text-center">Album</h1>
                    </div>
                  </div>
                </NavLink>
              ))
            ) : (
              <div><MusicLoader /></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
