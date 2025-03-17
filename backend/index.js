"use strict"

// import Neccessary node packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";
import {createDatabase, tblAdmin, tblAlbum, tblArtist, tblPlaylist, tblSong, tblUser,tblReport} from "./db.js";

// .env file configuration
dotenv.config();

// Database Configuration
export let conn = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "savan_33",
  database : process.env.DATABASE_NAME
});

conn.connect((error) => {
  if(error){
    return;
  }
  console.log("Connected to Database.");
  createDatabase();
  tblUser()
  tblAdmin();
  tblArtist();
  tblSong();
  tblPlaylist();
  tblAlbum();
  tblReport();
})


// server configuration
export const app = express();
app.listen(process.env.SERVER_PORT,(err) => {
  if(err){
    return err
  }
  console.log(`server Running on Port ${process.env.SERVER_PORT}`);
});

app.use(cors({
  origin : ["http://localhost:5173","https://accounts.spotify.com/authorize","http://localhost:3000"],
  methods : ['GET','POST','PUT','DELETE'],
  allowedHeaders : ['Content-type','Authorization']
}));
// Middleware configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));


// Page Router
import { AuthRoutes } from "./apis/Spotify/Auth/Token.js"
import { TrackRouter } from "./apis/Spotify/Routes/Track.Route.js"
import { searchRoute } from "./apis/Spotify/Routes/Search.Route.js";
import { deviceRoute } from "./apis/Spotify/Routes/Device.Route.js";
import { userRoute } from "./apis/Spotify/Routes/User.Route.js";
import { playRoute } from "./apis/Spotify/Routes/Play.Route.js";
import { ArtistRoute } from "./apis/Spotify/Routes/Artist.Routes.js";
import { AlbumRoute } from "./apis/Spotify/Routes/Album.Routes.js";
import { playListRoute } from "./apis/Spotify/Routes/Playlist.Routes.js";
import { authRoutes } from "./apis/Spotify/Routes/Auth.Routes.js";

// Mail Routers
import MailRouter from "./apis/Mail/Mail.Routes.js";

// Lyrics 
import LyricsRouter from "./apis/Genius/Routes/lyrics.Routes.js";
import {adminRoutes} from "./apis/Admin/Routes.js"

// Artists Routes
import {ArtistsRoutes} from "./apis/Artist/Routes.js"


// Route Configuration
app.use("/",AuthRoutes);
app.use("/",TrackRouter);
app.use("/",searchRoute);
app.use("/",deviceRoute);
app.use("/",playRoute);
app.use("/",userRoute);
app.use("/",ArtistRoute);
app.use("/",AlbumRoute);
app.use("/",playListRoute);
app.use("/",authRoutes);

// Lyrics Routes
app.use("/",LyricsRouter);

// Mails Routes
app.use("/",MailRouter);

// Admin Routes
app.use("/",adminRoutes)

// Artists Routes
app.use("/",ArtistsRoutes)

export default conn;