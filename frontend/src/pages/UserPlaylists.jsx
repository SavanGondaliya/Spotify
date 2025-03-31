import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PlaylistBase64 } from "../components/User/Playlist/icon/Playlist";
import { useParams } from "react-router-dom";
import MusicLoader from "../components/User/utility/Loader";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { PlayerController } from "../components/User/Playler/Controller";

export const UserPlaylist = () => {
  const session_details = JSON.parse(sessionStorage.getItem("session_details"));
  const [playlists, setPlaylists] = useState();
  const { id } = useParams();
  const [playlistImage, setPlaylistImage] = useState([]);

  const getPlaylistImage = async () => {
    try {
      let playlistImageIds = playlists.map(
        (playlist) => playlist.song_id.split(",")[0]
      );

      let imageRequests = playlistImageIds.map((imageId) => {
        const url = `http://localhost:5000/tracks/${imageId}?session_details=${JSON.stringify(
          session_details
        )}`;
        console.log(url);

        return axios
          .get(url, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            if (res.status === 200) {
              return res?.data?.album?.images[0]?.url; // Return the image URL
            }
            return null;
          })
          .catch((error) => {
            console.log(error);
            return null; // Ensure failures don't break Promise.all()
          });
      });

      let imageArray = await Promise.all(imageRequests);

      setPlaylistImage(imageArray.filter(Boolean));
      console.log(imageArray);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  useEffect(() => {
    axios
    .get(`http://localhost:5000/playlist/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setPlaylists(res.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  useEffect(() => {

    getPlaylistImage();
  },[playlists])


  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col flex-wrap w-full h-full">
        <div className="w-[100%] h-[88%]">
          <div className="flex w-full h-full">
            <div className="w-[15%] h-full">
              <VerticalNavbar />
            </div>
            <div className="flex flex-wrap">
              <div className="w-[100%]">
                <HorizontalNavbar />
              </div>
              <div className="flex flex-col w-325 h-[88%] overflow-y-scroll">
                <div className="w-full p-5">
                  {playlists ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {playlists.map((playlist, index) => (
                        <NavLink
                          key={playlist?.playlist_id}
                          to={`/playlist/${playlist?.playlist_id}`}
                          className="bg-indigo-900 p-4 rounded shadow-lg hover:shadow-xl transition duration-300"
                        >
                          {/* Playlist Image */}
                          <img
                            className="w-full h-40 object-cover rounded"
                            src={
                              playlistImage[index]
                                ? playlistImage[index]
                                : PlaylistBase64
                            }
                            alt=""
                          />

                          <div className="mt-3 text-center">
                            <h2 className="text-lg font-semibold">
                              {playlist?.playlist_name}
                            </h2>
                            <p className="text-gray-400 text-sm">
                              Total Songs:{" "}
                              {playlist?.song_id
                                ? playlist.song_id.split(",").length
                                : 0}
                            </p>
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  ) : (
                    <MusicLoader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[12%] bg-indigo-400">
          <PlayerController />
        </div>
      </div>
    </div>
  );
};
