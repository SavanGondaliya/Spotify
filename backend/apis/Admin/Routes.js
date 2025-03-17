import express from "express"

export const adminRoutes = express.Router(); 
import { getUsers,updateUser,deleteUser, updateSongDetails } from "./Controller.js";
import { getArtists,updateArtist,deleteArtist } from "./Controller.js";
import { getSongs,deleteSong } from "./Controller.js";
import { getProjectPartner } from "./Controller.js";


adminRoutes.get("/api/users",getUsers);
adminRoutes.put("/api/users/:id",updateUser);
adminRoutes.delete("/api/users/:id",deleteUser);
adminRoutes.get("/api/artists/",getArtists);
adminRoutes.put("/api/artists/:id",updateArtist);
adminRoutes.delete("/api/artists/:id",deleteArtist);
adminRoutes.get("/api/songs/",getSongs);
adminRoutes.put("/api/songs/:id",updateSongDetails);
adminRoutes.delete("/api/songs/:id",deleteSong);
adminRoutes.get("/projectpartner",getProjectPartner);