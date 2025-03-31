import axios from "axios";
import React, { useEffect, useState } from "react";
import { Play, Pause } from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { useParams } from "react-router-dom";
import MusicLoader from "../utility/Loader";
import "./style.css";
import Waves from "../../Animations/Waves";
import LayerWave from "../../Animations/LayerWave";
import Wave from "../../Animations/Wave";
import YellowWave from "../../Animations/Yellowave"

export const ArtistDetails = () => {
  const session_details = sessionStorage.getItem("secret_key");

  const { id } = useParams();
  const [artistDetails, setArtistDetails] = useState("");
  const [localArtist, setLocalArtist] = useState("");
  const { player, deviceId } = useWebPlayback();
  const [currentState, setCurrentState] = useState("");
  const [positionMs, setPositionMs] = useState();
  const [isPlay, setIsPlay] = useState(null);

  const artist = async () => {
    try {
      const url = `http://localhost:5000/artist/${id}?session_details=${session_details}`;

      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setArtistDetails(response.data);
          }
        })
        .catch((error) => {
          setArtistDetails(error);
        });

      axios
        .get(
          `http://localhost:5000/localArtist/${id}?session_details=${session_details}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setLocalArtist(response.data);
          }
        })
        .catch((error) => {
          setLocalArtist(error);
        });
    } catch (error) {
      setArtistDetails(error);
    }
  };

  useEffect(() => {
    if (!player) return;
    player.addListener("ready", () => {
      player.getCurrentState().then((state) => {
        if (!state) {
          return;
        }
        setPositionMs(state.position);
        setCurrentState(state);
      });
    });
  }, [isPlay, player]);

  const handleMusic = (id, type) => {
    if (isPlay == id) {
      Pause(id, deviceId);
      setIsPlay(null);
    } else {
      setPositionMs(0);
      Play(id, deviceId, type, positionMs);
      setIsPlay(id);
    }
  };

  useEffect(() => {
    artist();
  }, [id]);

  return (
    <div className="flex flex-col items-start justify-center space-y-8 p-6">
      {artistDetails && typeof artistDetails === "object" && localArtist ? (
        <div className="w-100 flex flex-col  items-center rounded space-y-6">
          <div className="relative w-full max-w-3xl  __artist_image__ rounded">
            <img
              className="w-full h-[400px] object-cover rounded shadow-lg opacity-40"
              src={artistDetails?.images[0]?.url || localArtist[0]?.image}
              alt="Artist"
            />

            <div className="absolute inset-0 flex items-center justify-center z-20 ">
              <Waves />
            </div>

            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 flex flex-col items-start space-y-2 z-20">
              <img
                className="w-32 h-32 object-cover shadow-md __artist_image__"
                src={artistDetails?.images[0]?.url || localArtist[0]?.image}
                alt="Artist Thumbnail"
              />
              <p className="text-3xl font-bold text-white _artist_text_">
                {artistDetails?.name || localArtist[0]?.artist_name}
              </p>
            </div>
          </div>

          <div className="grid  grid-cols-3 gap-8 text-2xl text-white">
            <div
              onClick={() => handleMusic(artistDetails?.id, "artist")}
              className="cursor-pointer hover:text-indigo-400"
            >
              {currentState?.paused ? (
                <i className="ri-pause-circle-fill"></i>
              ) : (
                <i className="ri-play-circle-fill"></i>
              )}
            </div>
            <div className="cursor-pointer hover:text-indigo-400">
              <i className="ri-shuffle-fill"></i>
            </div>
            <div className="cursor-pointer hover:text-indigo-400">
              <i className="ri-more-2-fill"></i>
            </div>
          </div>
          <div className="relative w-full h-auto p-6 bg-[#282870] text-white overflow-hidden rounded-lg shadow-lg __about_artist__">
            {/* Background Wave Animation */}
            <div className="absolute inset-0 z-0 pointer-events-none scale-200 rotate-330 left-30 top-40">
              <YellowWave />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-3 _artist_text_">
                About The Artist
              </h2>
            </div>

            <div className="max-h-80 overflow-scroll p-4 rounded-md relative z-10">
              {localArtist ? (
                <p className="text-lg leading-relaxed">{localArtist[0]?.bio}</p>
              ) : (
                <p className="text-xl text-gray-300">Bio Not Found</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <MusicLoader />
      )}

      <style>
        {`
            .__about_artist__{
                box-shadow: 8px 8px 0px #4949bf;
                }
            ._artist_text_{
                color: #f2c178;
            }
            .__artist_image__{
                box-shadow: 8px 8px 0px #4949bf;
            }
            `}
      </style>
    </div>
  );
};
/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */
