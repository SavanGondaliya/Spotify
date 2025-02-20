import express from "express"
import { getSongs,search,getHindiAlbums, getAlbumId } from "../Controllers/Search.controller.js";
export const searchRoute = express.Router();

searchRoute.get("/search",search);
searchRoute.get("/Albums",getHindiAlbums);
searchRoute.get("/songs",getSongs);
searchRoute.get("/albumids",getAlbumId);

export default searchRoute;