import express from "express";
import { getTrackById, getUserSavedTracks, saveCurrentTrack,deleteCurrentTrack, isUserContainTrack,getSeveralTracks, populerTracks, likeSong  } from "../Controllers/Track.controller.js";
export const TrackRouter = express.Router();

TrackRouter.get("/tracks/:id",getTrackById);
TrackRouter.get("/tracks",getSeveralTracks);
TrackRouter.get("/tracks/saved_tracks",getUserSavedTracks);
TrackRouter.get("/tracks/save/:ids",saveCurrentTrack);
TrackRouter.get("/tracks/delete/:ids",deleteCurrentTrack);
TrackRouter.get("/tracks/contain/:ids",isUserContainTrack);
TrackRouter.get("/tracks/populer",populerTracks);
TrackRouter.post("/tracks/like/:id",likeSong);

export default TrackRouter;