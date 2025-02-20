import express from  "express";
import { getLyrics,tester } from "../Controllers/lyrics.controller.js";

export const LyricsRouter = express.Router();

LyricsRouter.get('/lyrics/',getLyrics);
LyricsRouter.get('/tester/',tester);

export default LyricsRouter;


