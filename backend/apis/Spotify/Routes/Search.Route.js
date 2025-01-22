import express from "express"
import { search } from "../Controllers/Search.controller.js";

export const searchRoute = express.Router();

searchRoute.get("/search",search);

export default searchRoute;