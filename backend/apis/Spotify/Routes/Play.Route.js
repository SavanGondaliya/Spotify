import express from "express";
import { play,playBackState,pause,setRepeatMode, PlayingSong,recentlyPlayedSongs,setTrackQueue,getTrackQueue } from "../Controllers/Play.controller.js";
import { skipToNext,skipToPrevious,setVolume,seekTrack,playBackShuffle } from "../Controllers/Play.controller.js";

export const playRoute = express.Router();

playRoute.get("/play/:id",play)
playRoute.get("/trackState",playBackState);
playRoute.get("/pause/:id",pause);
playRoute.get("/repeat/:id",setRepeatMode);
playRoute.get("/currently-playing",PlayingSong);
playRoute.get("/recently-played",recentlyPlayedSongs);
playRoute.get("/queue/:id",setTrackQueue);
playRoute.get("/queue/",getTrackQueue);
playRoute.get("/track/next",skipToNext);
playRoute.get("/track/previous",skipToPrevious);
playRoute.get("/track/volume",setVolume);
playRoute.get("/track/seek",seekTrack);
playRoute.get("/shuffle",playBackShuffle);

export default playRoute;