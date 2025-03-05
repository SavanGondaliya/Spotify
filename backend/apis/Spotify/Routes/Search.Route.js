import express from "express"
import { getSongs,search,getHindiAlbums, getAlbumId } from "../Controllers/Search.controller.js";
import { populerTracks } from "../Controllers/Track.controller.js";
export const searchRoute = express.Router();

searchRoute.get("/search",search);
searchRoute.get("/Albums",getHindiAlbums);
searchRoute.get("/songs",getSongs);
searchRoute.get("/albumids",getAlbumId);
searchRoute.get("/populerTracks",populerTracks);

export default searchRoute;