"use strict"

import axios from "axios";
import { accessToken,localStorage } from "../../../config.js";


export const userDevices = async(req,res) => {
    
    let userDeviceList = [];
    try {
        const response = await axios.get(`https://api.spotify.com/v1/me/player/devices`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        
        if(response.status === 200){
            response.data.devices.forEach((element) => {
                userDeviceList.push(element)
            })
            return userDeviceList;
        }
        return res.status(404).send({message: "No Devices Found for this account"})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
}