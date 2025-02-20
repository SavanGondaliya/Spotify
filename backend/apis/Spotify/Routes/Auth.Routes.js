import express from  "express";
import { refreshToken } from "../Auth/Token.js";
import { login,callback,userToken } from "../Controllers/Auth.controller.js";

export const authRoutes = express.Router();

authRoutes.get("/refresh",refreshToken);
authRoutes.post("/login",login);
authRoutes.get("/callback",callback);
authRoutes.get("/authToken",userToken);

export default authRoutes;
