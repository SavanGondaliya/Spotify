import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams,NavLink } from "react-router-dom";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { PlayerController } from "../components/User/Playler/Controller";
import MusicLoader from "../components/User/utility/Loader";
import { getUserPlaylist } from "../components/User/utility/SongManipulation";
import UserTopTracks from "../components/User/Profile/TopTracks";
import { Profile } from "../components/User/Profile/Profile";
import UserReports from "../components/User/Profile/Reports";

export const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const [userPlaylists,setPlaylists] = useState([]);  
  const [activePlaylist, setActivePlaylist] = useState(null);
    const playlists = async () => {
      let playlist = await getUserPlaylist();
      setPlaylists(playlist);
    };
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/profile/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    playlists();
  },[]);

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
              <div className="flex px-4 flex-col  w-325 h-[88%] overflow-y-scroll">
                
                <div>
                  <Profile userDetails={user}/>
                </div>
                <div class="mt-8 mx-35">
                  <h2 class="text-xl font-semibold">Monthly Reports</h2>
                  <div class="flex space-x-8 mt-4">
                    <UserReports/>
                  </div>
                </div>

                <div class="mt-8 mx-35">
                  <h2 class="text-xl font-semibold">
                    Your top tracks this month
                  </h2>
                  <UserTopTracks/>
                </div>

                <div class="mt-8 mx-35">
                  <h2 class="text-xl font-semibold">Your Public Playlists</h2>
                  <div class="grid grid-cols-2 gap-6 mt-4">
                    {userPlaylists?.map((playlist, index) => (
                      <NavLink
                        to={`/playlist/${playlist.playlist_id}`}
                        key={playlist.id}
                        className={`playlist-item ${
                          activePlaylist === index ? "active" : ""
                        }`}
                        onClick={() => setActivePlaylist(index)}
                      >
                        <div className="icon"></div>
                        <div className="text">
                          <p>{playlist.playlist_name}</p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
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
