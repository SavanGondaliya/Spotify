import express from "express";
import { getArtistAlbum, getArtistDetail, getArtistTopTrack, getMultipleArtits } from "../Controllers/Artist.controller.js";

export const ArtistRoute = express.Router();

ArtistRoute.get("/artist/:id",getArtistDetail);
ArtistRoute.get("/artist/albums/:id",getArtistAlbum);
ArtistRoute.get("/artist/top-tracks/:id",getArtistTopTrack);
ArtistRoute.get("/artists/:id",getMultipleArtits);


export default ArtistRoute; 


