import express from "express";
import { getTrackById,getSavedTracks,play } from "../controllers/Track.controller.js";
export const TrackRouter = express.Router();

TrackRouter.get("/tracks/:id",getTrackById);
TrackRouter.get("/tracks/saved_tracks",getSavedTracks);
TrackRouter.get("/tracks/play",play);

export default TrackRouter
    