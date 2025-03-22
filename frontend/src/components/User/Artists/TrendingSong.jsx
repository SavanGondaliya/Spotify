import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import useWebPlayback from "../utility/WebPlayBackSDK";
import { Play, Pause } from "../utility/SongManipulation";
import MusicLoader from "../utility/Loader";
import Wave from "../../Animations/Wave";
import { NavLink } from "react-router-dom";

export const TrendingSong = () => {
  const secret_details = sessionStorage.getItem("secret_key");
  const [trendingId, setTrendingId] = useState();
  const [trendingSong, setTrendingSong] = useState();
  const [isPlay, setIsPlay] = useState(null);
  const { player, deviceId } = useWebPlayback();
  const [positionMs, setPositionMs] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/trending`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setTrendingId(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getTrendingSong = () => {
    try {
      const url = `http://localhost:5000/tracks/${trendingId[0]}?session_details=${secret_details}`;

      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setTrendingSong(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (!player) return;

    const handlePlayerStateChange = (state) => {
      if (!state) {
        return;
      }
    };

    player.addListener("player_state_changed", handlePlayerStateChange);

    player.getCurrentState().then((state) => {
      if (!state) {
        return;
      }
      console.log(state);
      setPositionMs(state?.position);
    });
    return () =>
      player.removeListener("player_state_changed", handlePlayerStateChange);
  }, [player]);

  const handleMusic = (id, type) => {
    if (isPlay == id) {
      setIsPlay(null);
      Pause(id, deviceId);
    } else {
      setIsPlay(id);
      Play(id, deviceId, type, positionMs ? positionMs : 0);
    }
  };

  useEffect(() => {
    getTrendingSong();
  }, [trendingId]);

  useEffect(() => {}, []);
  console.log(trendingSong);

  return (
    // <div className="w-full flex justify-center items-center py-8">
    //   {trendingSong ? (
    //       <div className="relative  text-white w-[80%] h-80 flex shadow-lg p-6 trending_container overflow-hidden">
    //       <div className="rotate-330 absolute top-25 left-30">
    //             <Wave />
    //       </div>
    //       <div className="flex z-50 flex-col justify-center w-2/3 pl-6">
    //         <h1 className="text-lg font-semibold">Trending Now Hits</h1>
    //         <h1 className="text-2xl font-bold">{trendingSong.name}</h1>
    //         <span className="font-semibold">{trendingId[1]} Plays</span>
    //         <button
    //           onClick={() => handleMusic(trendingSong.id, "track")}
    //           className="mt-4 px-4 py-2 text-black font-semibold cursor-pointer"
    //         >
    //           Play Now
    //         </button>
    //       </div>
    //       <div className="absolute right-[-30px] bottom-[-20px] ">
    //         <img
    //           className="w-48 h-48 shadow-lg"
    //           src={trendingSong?.album?.images[0]?.url}
    //           alt="Trending Song"
    //         />
    //       </div>
    //     </div>
    //   ) : (
    //     <MusicLoader />
    //   )}
    //   <style>
    //     {`
    //         .trending_container {
    //             border-radius:5px;
    //             background-color: #282870;
    //             box-shadow: 10px 10px 0px #4949bf;
    //         }
    //         .__wave_position__ {
    //             transform: rotate(90deg);
    //         }
    //     `}
    //
    //   </style>
    // </div>
    <div className="w-full flex justify-center items-center py-8 relative">
      {trendingSong ? (
        <div className="relative text-white w-[80%] h-80 flex shadow-lg p-6 trending_container overflow-hidden">
          <div className="rotate-[340deg] scale-200 absolute bottom-5">
            <Wave />
          </div>

          <div className="flex z-50 flex-col justify-around w-2/3 pl-6">
            <div>
              <h1 className="text-4xl font-semibold">
                Trending Now Hits
              </h1>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{trendingSong.name}</h1>
              <h1>
                {trendingSong?.artists?.map((artist, i) => (
                  <React.Fragment key={artist?.id}>
                    <NavLink
                      to={`http://localhost:5173/artist/${artist?.id}`}
                      className="hover:underline"
                    >
                      {artist.name}
                    </NavLink>
                    {i < trendingSong?.artists?.length - 1 && ", "}
                  </React.Fragment>
                ))}
                <span className="__trending_play__ font-semibold mx-5">
                  {trendingId[1]} Plays
                </span>
              </h1>
              <div className="w-fit h-fit px-5 py-1 rounded __trending_btn__">
                <button
                  onClick={() => handleMusic(trendingSong.id, "track")}
                  className="text-black font-semibold cursor-pointer"
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MusicLoader />
      )}

      {/* Move the image OUTSIDE of .trending_container */}
      <div className="__trending_image_container__ absolute right-[5%] top-[5%] z-50">
        <img
          className="w-48 h-48 shadow-lg"
          src={trendingSong?.album?.images[0]?.url}
          alt="Trending Song"
        />
      </div>

      {/* Styles */}
      <style>
        {`
        .trending_container {
            border-radius: 5px;  
            background-color: #282870;
            box-shadow: 10px 10px 0px #4949bf;
        }
        .__trending_image_container__{
          box-shadow : 8px 8px 0px #f2c178
        }
        .__trending_btn__{
          background-color: #f2c178;
          box-shadow: 5px 5px 0px #935d07
        } 
        .__trending_play__ {
          color: #f2c178
        }
      `}
      </style>
    </div>
  );
};
/* // 282870 // 4949bf // 935d07 // f2c178 // 05040c */
