import express from "express";
import { playTrack, playAlbum, playBackState, pause, setRepeatMode, PlayingSong, recentlyPlayedSongs, setTrackQueue, getTrackQueue, playArtist } from "../Controllers/Play.controller.js";
import { skipToNext, skipToPrevious, setVolume, seekTrack, playBackShuffle } from "../Controllers/Play.controller.js";

export const playRoute = express.Router();

playRoute.get("/play/track/:id",playTrack);
playRoute.get("/play/album/:id",playAlbum);
playRoute.get("/play/artist/:id",playArtist);
playRoute.get("/playback",playBackState);
playRoute.get("/pause/:id",pause);
playRoute.get("/repeat/",setRepeatMode);
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