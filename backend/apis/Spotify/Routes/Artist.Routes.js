import express from "express";
import { getArtistAlbum, getArtistDetail, getArtistTopTrack, getMultipleArtits,getFeaturedAlbum, getRelatedArtist } from "../Controllers/Artist.controller.js";
import { getLocalArtistDetails,kpopArtist,BollywoodArtist,TopBollywoodArtist,TopHollywoodArtist } from "../Controllers/Artist.controller.js";

export const ArtistRoute = express.Router();

ArtistRoute.get("/artist/:id",getArtistDetail);
ArtistRoute.get("/artist/albums/:id",getArtistAlbum);
ArtistRoute.get("/artist/featured/:id",getFeaturedAlbum);
ArtistRoute.get("/artist/top-tracks/:id",getArtistTopTrack);
ArtistRoute.get("/artists",getMultipleArtits);
ArtistRoute.get("/kpop",kpopArtist);
ArtistRoute.get("/bollywood",BollywoodArtist);
ArtistRoute.get("/localArtist/:id",getLocalArtistDetails);
ArtistRoute.get("/top-bollywood",TopBollywoodArtist);
ArtistRoute.get("/top-hollywood",TopHollywoodArtist);
ArtistRoute.get("/relatedArtist",getRelatedArtist);

export default ArtistRoute; 

