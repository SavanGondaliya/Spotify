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

//   export const updateMonthlyReport = async (req, res) => {
//     try {
//         console.log("Updating Monthly Report...");

//         const { userId, artist, song, timeSpent } = req.body;

//         if (!userId || !artist || !song || !timeSpent) {
//             return res.status(400).send({ message: "Missing required fields" });
//         }

//         // Get current month (YYYY-MM format)
//         const reportMonth = new Date().toISOString().slice(0, 7);

//         // Fetch the existing report
//         const selectQuery = `SELECT * FROM tblreport WHERE userId = ? AND reportMonth = ?`;
//         conn.query(selectQuery, [userId, reportMonth], (err, results) => {
//             if (err) return res.status(500).send({ message: "Database error", error: err });

//             let newStreamingTime = timeSpent;
//             let updatedListenedArtist = {};
//             let updatedListenedSongs = {};

//             if (results.length > 0) {
//                 const report = results[0];

//                 // Merge streaming time
//                 newStreamingTime += parseInt(report.streamingTime || 0);

//                 // Merge listened artists
//                 const existingArtists = JSON.parse(report.listenedArtist || "{}");
//                 updatedListenedArtist = { ...existingArtists, [artist]: (existingArtists[artist] || 0) + 1 };

//                 // Merge listened songs
//                 const existingSongs = JSON.parse(report.listenedSongs || "{}");
//                 updatedListenedSongs = { ...existingSongs, [song]: (existingSongs[song] || 0) + 1 };

//                 // Update report
//                 const updateQuery = `
//                     UPDATE tblreport 
//                     SET streamingTime = ?, listenedArtist = ?, listenedSongs = ?, updatedAt = NOW()
//                     WHERE userId = ? AND reportMonth = ?
//                 `;
//                 const updateValues = [
//                     newStreamingTime,
//                     JSON.stringify(updatedListenedArtist),
//                     JSON.stringify(updatedListenedSongs),
//                     userId,
//                     reportMonth
//                 ];
//                 conn.query(updateQuery, updateValues, (updateErr) => {
//                     if (updateErr) return res.status(500).send({ message: "Update error", error: updateErr });

//                     return res.status(200).send({ message: "Report updated successfully" });
//                 });

//             } else {
//                 // Create a new report
//                 updatedListenedArtist[artist] = 1;
//                 updatedListenedSongs[song] = 1;

//                 const insertQuery = `
//                     INSERT INTO tblreport (reportMonth, userId, streamingTime, listenedArtist, listenedSongs, createdAt, updatedAt)
//                     VALUES (?, ?, ?, ?, ?, NOW(), NOW())
//                 `;
//                 const insertValues = [
//                     reportMonth,
//                     userId,
//                     newStreamingTime,
//                     JSON.stringify(updatedListenedArtist),
//                     JSON.stringify(updatedListenedSongs)
//                 ];
//                 conn.query(insertQuery, insertValues, (insertErr) => {
//                     if (insertErr) return res.status(500).send({ message: "Insert error", error: insertErr });

//                     return res.status(200).send({ message: "New report created successfully" });
//                 });
//             }
//         });

//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

// export const getMonthlyReport = async (req, res) => {
//   try {
//       const { userId, month } = req.query;

//       if (!userId) {
//           return res.status(400).send({ message: "User ID is required" });
//       }

//       // Default to current month if no month is provided
//       const reportMonth = month || new Date().toISOString().slice(0, 7);

//       const query = `SELECT * FROM tblreport WHERE userId = ? AND reportMonth = ?`;
//       conn.query(query, [userId, reportMonth], (error, results) => {
//           if (error) return res.status(500).send({ message: "Database error", error });

//           if (results.length === 0) {
//               return res.status(404).send({ message: "No report found for this month" });
//           }

//           // Parse JSON fields
//           const report = results[0];
//           report.listenedArtist = JSON.parse(report.listenedArtist || "{}");
//           report.listenedSongs = JSON.parse(report.listenedSongs || "{}");

//           res.status(200).send(report);
//       });

//   } catch (error) {
//       res.status(500).send({ message: error.message });
//   }
// };
