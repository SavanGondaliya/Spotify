import express from  "express";
import {fetchLyrics} from "../Controllers/lyrics.controller.js"
export const LyricsRouter = express.Router();

LyricsRouter.get("/lyrics",fetchLyrics);

export default LyricsRouter;


