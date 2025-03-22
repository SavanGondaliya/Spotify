import express from "express";
import { getTrackById, saveCurrentTrack,deleteCurrentTrack,getUserSavedTracks,getLocalTracks, isUserContainTrack,getSeveralTracks, populerTracks, trendingSong, topHits, Songs } from "../Controllers/Track.controller.js";
export const TrackRouter = express.Router();

TrackRouter.get("/tracks/:id",getTrackById);
TrackRouter.get("/tracks",getSeveralTracks);
TrackRouter.get("/track/saved_tracks",getUserSavedTracks);
TrackRouter.get("/tracks/save/:ids",saveCurrentTrack);
TrackRouter.get("/tracks/delete/:ids",deleteCurrentTrack);
TrackRouter.get("/tracks/contain/:ids",isUserContainTrack);
TrackRouter.get("/tracks/populer",populerTracks);
TrackRouter.get('/local/tracks',getLocalTracks);
TrackRouter.get('/trending',trendingSong);
TrackRouter.get('/top-hits',topHits);
TrackRouter.get('/music',Songs);

export default TrackRouter;