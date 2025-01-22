import axios from "axios";
import { accessToken,localStorage } from "../../../config.js";

export const getArtistDetail = async(req,res) => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }
        const {id} = req.params;
        const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`,{
            headers:{
                "Content-Type": "application",
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

export const getArtistAlbum = async(req, res) => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }
        const {id} = req.params;
        const response  = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`,{
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

export const getArtistTopTrack = async() => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }

        const response = await axios.get(`https://api.spotify.com/v1/artists/{id}/top-tracks`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization":  `Bearer ${accessToken}`
            }
        });
        if(response.status === 404){
            return res.status(404).send({message : response.data.statusText});
        }
        return res.status(response.status).send(response.data);
    } catch (error) {   
        return res.status(500).send({message : error.message});
    }
}

export const getMultipleArtits = async(req, res) => {
    try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }

        const { ids } = req.params;

        const response = await axios.get(`https://api.spotify.com/v1/artists/${ids}`,{
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