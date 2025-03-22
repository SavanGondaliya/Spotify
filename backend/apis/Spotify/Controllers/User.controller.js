"use strict"

import axios from "axios";
import conn from "../../../index.js";

    export const userProfile = async(req,res) => {

        try{

            const {id} = req.params;
            
            const query = `SELECT COUNT(tblplaylist.playlist_id) AS totalPlaylist, tbluser.* 
                            FROM tbluser 
                            INNER JOIN tblplaylist ON tblplaylist.user_id = tbluser.user_id 
                            WHERE tbluser.user_id = ?;`;
            console.log(query);
            
            conn.query(query,[id],(err,results) => {
                if(!err){
                    return res.status(200).send(results);
                }        
            });
        
        } catch (error) {
            return res.status(500).send({message : error.message})
        }
    }

    export const userTopArtist = async(req, res) => {

        try {

            const range = "medium_range";
            const limit = 10;
            const offset = 0;

            const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?range=${range}&limit=${limit}&offset=${offset}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken.access_token}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data);
            }
            return res.status(404).send({message : "No Data Found."});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const userTopTracks = async(req,res) => {
        try {
            const range = "medium_range";
            const limit = 10;
            const offset = 0;

            const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?range=${range}&limit=${limit}&offset=${offset}`,{
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            })
            if(response.status  ===  200){
                return res.status(200).send(response.data);
            }
            return res.status(404).send({message : "No Data Found"});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const getUserProfile = async(req, res) => {
        try {

            if(!accessToken){
                return res.status(401).send("Unauthorized Token.")
            }

            const user_id = req.params;
            
            const response = await axios.get(`https://api.spotify.com/v1/users/${user_id}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            
            if(response.status ===  200){
                return res.status(200).send(response.data);
            }
            return res.status(404).send({message : "No User Found."});
        } catch (error) {
            return res.status(500).send({message :  error.message});
        }
    }

    export const userArtist =  async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : "UnAuthorized User"});
            }
            const type = "artist";

            const limit = 10;
            const response = await axios.get(`https://api.spotify.com/v1/me/following?type=${type}&limit=${limit}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data);
            }

            return res.status(404).send({message : "No Artist Found"})
        } catch (error) {
            return res.status(500).send({message : error.message});      
        }
    } 

    export const followPlaylist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { playlistId } = req.params; 
            const isPublic = false

            const response = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}/followers`,{
                "public": isPublic
            },{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200  ){
                return res.status(200).send({message : "Follow Success  "});
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    
    export const unfollowPlaylist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { playlistId } = req.params; 

            const response = await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`,
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200  ){
                return res.status(200).send({message : "Unfollow Success"});
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const getFollowedArtist = async(req, res) => {
        try {
            const type = "artist"

            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }

            const response = await axios.get(`https://api.spotify.com/v1/me/following`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status ===  200){
                return res.status(200).send(response.data)
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message:  error.message});
        }
    }

    export const followArtist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }

            const { artistId }= req.params;
            
            const response = await axios.put(`https://api.spotify.com/v1/me/following?type=artist`,
             {
                ids : [
                    artistId
                ]                
             },
             {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });

            if(response.status === 204){
                return res.status(200).send({message : "SuccessFully Follow Artist"})
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const followUser  = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { userId } = req.params;
            
            const response = await axios.put(`https://api.spotify.com/v1/me/following?type=user`,
            {
                ids:[
                    userId
                ]
            },
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });

            if(response.status === 204){
                return res.status(200).send({message : "SuccessFully Follow User."});
            }

            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const unfollowArtist  = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { artistId } = req.params;
            
            const response = await axios.delete(`https://api.spotify.com/v1/me/following?type=artist`,
            {
                ids : [
                    artistId
                ]                
            },
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send({message : "SuccessFully Follow User."});
            }
            return res.status(404).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const unfollowUser  = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { userId } = req.params;
            const response = await axios.delete(`https://api.spotify.com/v1/me/following?type=user`,
            {
                ids : [
                    userId
                ]                
            },
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send({message : "SuccessFully Follow User."});
            }
            return res.status(404).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }


    export const isUserFollowArtist = async(req,res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }

            const {artistId } = req.params;
            const response = await axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${accessToken}`
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

    export const isUserFollowUser = async(req,res) => {
        try{
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const userId = req.params;

            const response = await axios.get(`https://api.spotify.com/v1/me/following/contains?type=user&ids=${userId}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization"  : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data)
            }
            return res.status(response.status).send({message : response.statusText});
        }
        catch(error){
            return res.status(500).send({message:  error.message});
        }
    }

    export const isUserFollowsPlaylist = async(req, res) => {

        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const playlistId = req.params;
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            }); 
            if(response.status ===  200){
                return res.status(200).send(response.data);
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message :error.message});
        }

    }


    export const updateMonthlyReport = async (req, res) => {
        try {
            console.log("Updating Monthly Report...");
    
            const { userId, artists, song, timeSpent } = req.body;
            console.log(userId,artists,song,timeSpent);
            
            if (!userId || !artists || !song || !timeSpent) {
                return res.status(400).send({ message: "Missing required fields" });
            }
    
            const reportMonth = new Date().toISOString().slice(0, 7);
            const selectQuery = `SELECT * FROM tblreport WHERE user_id = ? AND report_month = ?`;

            conn.query(selectQuery, [userId, reportMonth], (err, results) => {
                if (err) return res.status(500).send({ message: "Database error", error: err });
                
                let newStreamingTime = timeSpent;
                let updatedListenedArtists = {};
                let updatedListenedSongs = {};
                
                if (results.length > 0) {
                    const report = results[0];
                    
                    newStreamingTime += parseInt(report.streaming_time || 0);
    
                    const existingArtists = report.listened_artist || "{}";
                    
                    updatedListenedArtists = { ...existingArtists}
                    artists.forEach((artist) => {
                        
                        updatedListenedArtists[artist] = (updatedListenedArtists[artist] || 0) + 1 
                    })      
                    
                    const existingSongs = report.listened_songs || "{}";
                    
                    updatedListenedSongs = { ...existingSongs, [song]: (existingSongs[song] || 0) + 1 };
                    
                    const updateQuery = `
                        UPDATE tblreport 
                        SET streaming_time = ?, listened_artist = ?, listened_songs = ?
                        WHERE user_id = ? AND report_month = ?
                    `;

                    const updateValues = [
                        newStreamingTime,
                        JSON.stringify(updatedListenedArtists),
                        JSON.stringify(updatedListenedSongs),
                        userId,
                        reportMonth
                    ];
                    
                    conn.query(updateQuery, updateValues, (updateErr) => {
                        if (updateErr) return res.status(500).send({ message: "Update error", error: updateErr });
    
                        return res.status(200).send({ message: "Report updated successfully" });
                    });
    
                } else {
                    
                    artists.forEach((artist) => {
                        console.log(artist);
                        
                        updatedListenedArtists[artist] = 1;
                    })
                    updatedListenedSongs[song] = 1;
    
                    const insertQuery = `
                        INSERT INTO tblreport (report_month, user_id, streaming_time, listened_artist, listened_songs)
                        VALUES (?, ?, ?, ?, ?)
                    `;

                    const insertValues = [
                        reportMonth,
                        userId,
                        newStreamingTime,
                        JSON.stringify(updatedListenedArtists),
                        JSON.stringify(updatedListenedSongs)
                    ];
                    conn.query(insertQuery, insertValues, (insertErr) => {
                        if (insertErr) return res.status(500).send({ message: "Insert error", error: insertErr });
    
                        return res.status(200).send({ message: "New report created successfully" });
                    });
                }
            });
    
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };
    
    export const getMonthlyReport = async (req, res) => {
      try {
            
            const { user_id  } = JSON.parse(req.query.session_details);
                
            if (!user_id) {
                return res.status(400).send({ message: "User ID is required" });
            }
    
            // const reportMonth = month_name || new Date().toISOString().slice(0, 7);
    
            const query = `SELECT * FROM tblreport WHERE user_id = ?`;

            conn.query(query, [user_id], (error, results) => {
                if (error) return res.status(500).send({ message: "Database error", error });
        
                if (results.length === 0) {
                    return res.status(404).send({ message: "No report found for this month" });
                }
    
                const report = results;
                const reportArray = [];
                report.forEach((user) => {
                    
                    const topSongs = {...user.listened_songs}
                    const topArtist = {...user.listened_artist}
                    const sortedSongs =  Object.entries(topSongs).sort((a,b) => b[1] - a[1]).splice(0,5);
                    const sortedArtists =  Object.entries(topArtist).sort((a,b) => b[1] - a[1]).splice(0,5);
                    
                    const reportObject = {
                        "user_id":user?.user_id,
                        "report_month":new Date().getMonth(user?.report_month.slice(6)),
                        "topArtists":sortedArtists,
                        "topSongs":sortedSongs,
                        "timeSpent":user.streaming_time
                    }
                    reportArray.push(reportObject)
                });

                res.status(200).send(reportArray);
            });
    
      } catch (error) {
          res.status(500).send({ message: error.message });
      }
    };
    