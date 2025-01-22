import axios from "axios";
import { accessToken,localStorage } from "../../../config.js";
import { getTrackUri } from "./Play.controller.js";
import { convertImageToBase64, getSnapshotId } from "../Helpers/Playlist.helper.js";

    export const getPlaylistById = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            console.log('full URL : ',req.params);
            
            const  { playlistId }  = req.params;
            
            if(!playlistId){
                return res.status(404).send({message : "Playlist Id is Required."})
            }
            
            const response = await axios.get(`http://api.spotify.com/v1/playlists/${playlistId}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            
            if(response.status === 200){
                return res.status(200).send(response.data);
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    } 

    export const getUserPlaylist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const response = await axios.get(`https://api.spotify.com/v1/me/playlists`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization":  `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data);
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const updatePlaylistDetails = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }

            const { playlistId } = req.params;
            const name = "Avengers"
            const description = "You should Compromise Where You Thank You are Wrong not EveryWhere"
            const isPublic = true

            const response = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}`,
            {
                "name" : name,
                "description" : description,
                "public" : isPublic
            },{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send({message : "Playlist Detail Updated"});
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const getPlaylistTracks = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const {playlistId} = req.params;

            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data);
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message})
        }
    }


    export const addToPlaylistTracks = async(req, res) => {
        
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const {playlistId} = req.params;
            const trackUri = await getTrackUri(req, res);
            
            const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    "uris" : [trackUri],
                    "position" : 0
                },
                {
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${accessToken}`
                    }
                });
                if(response.status === 201){
                    return res.status(200).send({message : "Track Added SuccessFully."});
                }
                return res.status(response.status).send({message : response.statusText});
            } catch (error) {
                return res.status(500).send({message : error.message})
            }
        }
    
    export const deleteFromPlaylistTracks = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const {playlistId} = req.params;
            const trackUri = await getTrackUri(req, res);
            const snapshot_id   = await getSnapshotId(req,res,playlistId);
            console.log(playlistId,trackUri,snapshot_id);
        
            const response = await axios({
                method: "delete",
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                data: {
                    tracks: [
                        {
                            uri: trackUri,
                        },
                    ],
                    snapshot_id: snapshot_id,
                },
            });
        
            if(response.status === 200){
                return res.status(200).send({message : "Track Deleted SuccessFully."});
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message})
        }
    }

    export const otherUserPlaylist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }

            const {userId} = req.params;

            const response = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                res.status(200).send(response.data)
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const createPlaylist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { userId } = req.params;
            const name = "Heavan"
            const description = "It What something matter the most"
            const isPublic = false 
            console.log(userId,"Function Invoked.");

            const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                name : name,
                description : description,
                public : isPublic
            },
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            console.log(response.status);
            console.log(response);
            
            
            if(response.status === 201){
                return res.status(200).send({message : "Playlist Created Successfully."})
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const getPlaylistCoverImage = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { playlistId } = req.params; 

            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/images`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data)
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const setPlaylistCoverImage = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { playlistId } = req.params;
            const imagePath  = "E:/practice/cards/image/virat_kohli.png"
            const imageBase64 = await convertImageToBase64(imagePath)
            console.log(imageBase64,playlistId);

            const response = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}/images`,imageBase64,
            {
                headers : {
                    "Content-Type" : "image/jpeg",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            console.log(response.status);
            
            if(response.status === 202){
                return res.status(200).send({message : "Image Set Successfully."})
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message :  error.message});
        }
    } 