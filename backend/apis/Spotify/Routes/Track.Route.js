import express from "express";
import { getTrackById, getUserSavedTracks, saveCurrentTrack,deleteCurrentTrack, isUserContainTrack } from "../Controllers/Track.controller.js";
export const TrackRouter = express.Router();

TrackRouter.get("/:id",getTrackById);
TrackRouter.get("/saved_tracks",getUserSavedTracks);
TrackRouter.get("/save/:ids",saveCurrentTrack);
TrackRouter.get("/delete/:ids",deleteCurrentTrack);
TrackRouter.get("/contain/:ids",isUserContainTrack);

export default TrackRouter;
