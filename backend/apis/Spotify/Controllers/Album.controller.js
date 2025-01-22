import axios from "axios";
import { accessToken,localStorage } from "../../../config.js";
import { activeDeviceId } from "./Device.controller.js";

const Market = "In";

export const getAlbum = async(req,res) => {
    try {
        
        if(!accessToken){
            return res.status(401).send({Message : res.statusText});
        }
        const { id } = req.params;
        const response = await axios.get(`https://api.spotify.com/v1/albums/${id}?`,{
            headers:{
                "Content-Type" : "application",
                "Authorization" : `Bearer ${accessToken}`
            }
        });
        if(response.status === 404){
            return res.status(404).send({Message : response.statusText});
        }
        return res.status(response.status).send(response.data);
    } catch (error) {
        return res.status(500).send({Message : error.Message});
    }
}

export const getMultipleAlbums = async(req, res) => {
    try {
        if(!accessToken){
            return res.status(401).send({Message : res.statusText});
        }
        const {ids} = req.params;

        const response = await axios.get(`https://api.spotify.com/v1/albums/${ids}?market=${Market}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`
            }
        });
        if(response.status === 404){
            return res.status(404).send({message : response.statusText});
        }
        return res.status(response.status).send(response.data);
    } catch (error) {   
        return res.status(500).send({Message : error.Message });
    }
}

export const getAlbumTracks = async(req, res) => {
    try {
        const {id} = req.params;

        const response = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`
            }
        });
        if(response.status === 404){
            return res.status(404).send({message : response.statusText});
        }   
        return res.status(response.status).send(response.data);
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const userSavedAlbums = async(req, res) => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }
        
        const  response = await axios.get(`https://api.spotify.com/v1/me/albums`,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if(response.status === 404){
            return res.status(404).send({message : response.statusText});
        }
        return res.status(response.status).send(response.data);
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const saveCurrentAlbum = async(req, res) => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }
        const {id} = req.params;
        const deviceId = await activeDeviceId(req, res);
        
        const response = await axios.put(`https://api.spotify.com/v1/me/albums?ids=${id}&device_id=${deviceId}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`        
            }
        });
        if(response.status === 404){
            return res.status(404).send({message : response.statusText });
        }
        return res.status(response.status).send({message : "Album Saved To User Library"});
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const deleteCurrentAlbum = async(req, res) => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }
        const {id} = req.params;
        const deviceId = await activeDeviceId(req, res);
        console.log("Function Invoked",id);
        
        const response = await axios.delete(`https://api.spotify.com/v1/me/albums?ids=${id}&device_id=${deviceId}`,
        {
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`        
            }
        });
        if(response.status === 404){
            return res.status(404).send({message : response.statusText });
        }
        return res.status(response.status).send({message : "Album Deleted from User Library"});
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const checkAlbumForUser = async(req, res) => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }
        const {id} = req.params;
        const deviceId = await activeDeviceId(req,res);

        const response = await axios.get(`https://api.spotify.com/v1/me/albums/contains?ids=${id}&device_id=${deviceId}`,
        {
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`        
            }
        });
        console.log(response.status);
        
        if(response.status === 404){
            return res.status(404).send({message : response.statusText });
        }
        return res.status(response.status).send(response.data);
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const newRelease = async(req, res) => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }
        const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`
            }
        });
        if(response.status === 404){
            return res.status(404).send({message : response.statusText});
        }
        return res.status(response.status).send(response.data); 
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}
