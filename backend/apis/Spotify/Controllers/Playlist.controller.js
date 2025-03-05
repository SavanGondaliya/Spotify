import axios from "axios";
import conn from "../../../index.js";
import { getTrackUri } from "./Play.controller.js";
import { generatePlaylistId,convertImageToBase64, getSnapshotId } from "../Helpers/Playlist.helper.js";
import { getCurrentTracks,setPlaylistTracks,removeTrackFromPlaylist } from "../Helpers/Playlist.helper.js";

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

    // myplaylists APi ::
    
    export const createPlaylist = async(req, res) => {
        try {
            console.log('callled');
            
            const playlist_id = await generatePlaylistId();
            const {user_id} = JSON.parse(req.query.session_details);
            const {playlist_name,bio,status} = req.body;

            const query  =  `INSERT INTO tblplaylist(playlist_id, user_id,playlist_name, bio, isPublic) 
                            VALUES('${playlist_id}','${user_id}','${playlist_name}','${bio}',${status});`;
            
            conn.query(query,(error,results) => {
                if(error){
                    return error
                }
                else{
                    console.log(results);
                    return res.status(200).send({message:"Playlist Created"});
                }
            });
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const getUserPlaylists = async(req, res) => {
        try {
            
            const {user_id} = JSON.parse(req.query.session_details);
            
            const query = `SELECT * FROM tblplaylist WHERE user_id='${user_id}';`;
            
            conn.query(query,(error,results,fields) => {
                if(error){
                    console.log(error);
                    return res.status(400).send({message : "Error in the query"});
                }
                else{
                    console.log(results);
                    res.status(200).send(results);
                }
            })
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }    

    export const getPlaylistById = async(req, res) => {
        try {

            const {user_id} = JSON.parse(req.query.session_details)[0];
            const {playlist_id} = req.params;

            const query = `SELECT * FROM tbluser WHERE user_id='${user_id}' AND playlist_id='${playlist_id}';`;

            conn.query(query,(error,results,fields) => {
                if(error){
                    return res.status(400).send({message:error})
                }
                else{
                    return res.status(200).send(results)
                }
            })

        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }   

    export const deleteUserPlaylist = async(req, res) => {
        try {

            const {user_id} = JSON.parse(req.query.session_details)[0];
            const {playlist_id} = req.params;

            const query = `UPDATE FROM tblplaylist WHERE user_id='${user_id}' AND playlist_id='${playlist_id}';`;

            conn.query(query,(error,results) => {
                if(error){
                    console.log(error);
                    return res.status(400).send({message: error})
                }
                else{
                    console.log(results);
                    return res.status(200).send({message : "playlist Deleted"});
                }
            })
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    } 

    export const updateUserPlaylist = async(req, res) => {
        try {

            const {user_id} = JSON.parse(req.query.session_details);
            const {playlist_id} = req.params;
            const {name,bio,status} = req.body;

            const query = `UPDATE tblplaylist SET playlist_name='${name}',bio='${bio}',status=${status} WHERE user_id='${user_id}' AND playlist_id='${playlist_id}' `;

            conn.query(query,(error,results,fields)=>{
                if(error){
                    console.log(error);
                    return res.status(400).send({message : error})
                }
                else{
                    console.log(results);
                    return res.status(200).send(results)
                }
            })
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const getPlaylistTracks = async(req, res) => {
        try {   
            
            const {user_id} = JSON.parse(req.query.session_details);
            const {playlist_id} = req.params;
            const query = `SELECT song_id FROM tblplaylist WHERE playlist_id = '${playlist_id}' AND user_id='${user_id}';`;
            
            conn.query(query,(error,results) => {
                if(error){
                    return res.status(400).send({message : error})
                }
                else{
                    return res.status(200).send(results)
                }
            })
        } catch (error) {
            return res.send
        }   
    }

    export const addTrackToPlaylist = async(req,res) => {
        try {
            console.log("called");
            
            const {user_id} = JSON.parse(req.query.session_details);
            const {playlist_id,id} = req.params;
            const song_id = await getCurrentTracks(user_id,playlist_id);
            
            const newPlaylistTracks = await setPlaylistTracks(song_id,id);
            
            const query = `update tblplaylist set song_id='${newPlaylistTracks}' where playlist_id='${playlist_id}' and user_id='${user_id}';`;
            console.log(newPlaylistTracks,query);
            
            conn.query(query,(error,results) => {
                if(error){
                    return res.status(400).send(error)
                }
                console.log(results);
                
                res.status(200).send(newPlaylistTracks)
            })
            
        } catch (error) {
            return res.status(500).send({message:error.message});
        }
    }

    export const deleteTrackFromPlaylist = async (req, res) => {
        try {
            console.log("Delete track API called...");
    
            // Parse session details
            const sessionDetails = req.query.session_details ? JSON.parse(req.query.session_details) : {};
            const { user_id } = sessionDetails;
            
            if (!user_id) {
                return res.status(400).send({ message: "Invalid session details" });
            }
            
            const { playlist_id, id } = req.params;
            console.log(user_id,playlist_id,id);
    
            // Get current tracks
            const songIds = await getCurrentTracks(user_id, playlist_id);
            if (!songIds) {
                return res.status(400).send({ message: "Failed to get playlist tracks" });
            }
            console.log(songIds);
            
            // Remove the track from playlist
            const updatedTracks = removeTrackFromPlaylist(songIds, id);
            console.log(updatedTracks);
            
            // Update database
            const query = `UPDATE tblplaylist SET song_id = ? WHERE playlist_id = ? AND user_id = ?`;
            const values = [updatedTracks, playlist_id, user_id];
            console.log(query);
            
            conn.query(query, values, (error, results) => {
                if (error) {
                    return res.status(400).send(error);
                }
                console.log(results);
                res.status(200).send({ message: "Track removed successfully", updatedTracks });
            });
    
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };
    