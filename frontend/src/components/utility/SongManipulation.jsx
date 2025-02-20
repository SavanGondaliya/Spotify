import React from "react";
import { useState } from "react";
import axios from "axios";


const session_details = sessionStorage.getItem("session_details");

export const PlaySong = async(id,device_id) =>  {
    try {
        console.log(id,device_id);
        
        const response = await axios.get(`http://localhost:5000/play/track/${id}?session_details=${session_details}&deviceId=${device_id}`,{
            headers:{
                "Content-Type" :"application/json"
            }
        });
        console.log(response.status);
        
        if(response.status == 200){
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}

export const PauseSong = async(id,device_id) => {
    
    try {
        const response = await axios.get(`http://localhost:5000/pause/${id}?session_details=${session_details}&deviceId=${device_id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}

export const seekSong = async(position_ms,deviceId) => {
    try {

        const response = await axios.get(`http://localhost:5000/track/seek?session_details=${session_details}&position_ms=${position_ms}&deviceId=${deviceId}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return response.data
        }

    } catch (error) {
        return error;
    }
}

export const  getCurrentState = async(device_id) => {
    try {
        const response = await axios.get(`http://localhost:5000/playback?session_details=${session_details}&deviceId=${device_id}`,{
            headers:{
                "Content-Type" : "application/json"
            }
        });
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        return error        
    }
}

