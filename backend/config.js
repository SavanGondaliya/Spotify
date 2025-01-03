"use strict"

// import Necessary node packages
import { LocalStorage } from "node-localstorage";
import CryptoJs from "crypto-js";

// Configuration Variables
export const PORT = "5000";
export const localStorage = new LocalStorage("../Scratch");
export const accessToken = "";
if(localStorage.getItem("ACCESS_TOKEN")){
    const accessToken = CryptoJs.AES.decrypt(localStorage.getItem("ACCESS_TOKEN"),"ACCESS_TOKEN").toString(CryptoJs.enc.Utf8);
}
