import express from "express";
import { transferPlayback, } from "../Controllers/Device.controller.js";
import { userDevices } from "../Helpers/Device.helper.js";

export const deviceRoute = express.Router();

deviceRoute.get("/transfer/:id",transferPlayback);
deviceRoute.get("/userdevice",userDevices);

export default deviceRoute;