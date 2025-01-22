import CryptoJS from "crypto-js";
import scopes from "../Auth/Scopes.js";
import { localStorage } from "../../../config.js";

export const generateRandomString  = (length) => {

    // A function that return a encrypted random string for state
    let randomString = ""
    const STATESTRING = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const SECRET_KEY = process.env.SECRET_KEY;

    for(let i=0;i<length;i++){
        randomString += STATESTRING[Math.floor(Math.random()*STATESTRING.length)]
    }
    return CryptoJS.AES.encrypt(randomString,SECRET_KEY).toString();
  }

export const storeTolocalStorage = (accessToken,refreshToken) => {
    
    let incryptedAccessToken = CryptoJS.AES.encrypt(accessToken,"ACCESS_TOKEN")
    let incryptedRefreshAccessToken = CryptoJS.AES.encrypt(refreshToken,"REFRESH_TOKEN")

    localStorage.setItem("ACCESS_TOKEN",incryptedAccessToken);
    localStorage.setItem("REFRESH_TOKEN",incryptedRefreshAccessToken);
    console.log("Both Token Successfully setted.");
  }
  
export const getScope = () => {

  let scopeString = ""
  let elementCount = 0

  scopes.forEach((element) => {
    if(elementCount != scopes.length - 1){
      scopeString += `${element},`
      elementCount += 1
    }
    else{
      scopeString += `${element}`
    }
  });
  return scopeString;
}