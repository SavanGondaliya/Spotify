"use strict"

import axios from "axios";
import { userDevices } from "../Helpers/Device.helper.js";

  export const activeDeviceId = async(req,res,authToken) => {

    if(!authToken){
      return res.status(401).send({message : res.statusText});
    }

    try {
      let activeId = ""
      const response = await axios.get(`https://api.spotify.com/v1/me/player/devices`,{
          headers:{
            "Content-Type":  "application/json",
            "Authorization" : `Bearer ${authToken}`
          }
        },
      );
      
      if(response.status === 200){
        response.data.devices.forEach(element => {
          if(element.is_active == true){
            activeId = element.id            
          }
        });
        return activeId
      }
      return res.status(404).send({message: "No Active Device Found"})
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
  }

  export const transferPlayback = async(req, res) => {
    
    try {
      
      if(!accessToken){
        return res.status(401).send({message: "UnAuthorized User"})
      }
      
      const userDevice = await userDevices(req,res);

      if (!userDevice || userDevice.length === 0) {
        return res.status(400).send({ message: "No devices found for the user." });
      }
    
      
      const transferDevice = userDevice[0]; 
      
      const response = await axios.put(`https://api.spotify.com/v1/me/player/`,
      {
        "device_ids" : [
          transferDevice.id
        ]
      },{
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${accessToken}`
        }
      });
      
      if(response.status === 200){
        return res.status(200).send({message : `Device Transfered to ${transferDevice.name}`})
      }

    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  }