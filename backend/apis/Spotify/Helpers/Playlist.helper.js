import axios from "axios";
import conn from "../../../index.js";



    export const getSnapshotId = async(req,res) => {
        
        try {
        if(!accessToken){
            return res.status(401).send({message : res.statusText});
        }
        const { playlistId } = req.params;
        
        const response = await axios.get(`https://api.spotify.com/v1/me/playlists/`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`
            }
        });

        let snapshotId = "";
        if(response.status === 200){
            response.data.items.forEach((element) => {
                if(element.id === playlistId){
                    snapshotId = element.snapshot_id
                }
            });
            return snapshotId
        }
        return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return "No SnapshotId Found"
        }
    }

    export const convertImageToBase64 = async(imagePath) => {
        try {   
            const imageBuffer = fs.readFileSync(imagePath);
            const base64Data = imageBuffer.toString('base64');
            const base64Image = `${base64Data}`;

            return base64Image;

        } catch (error) {
            return "Unable To Convert in Base64"
        }
    }

    export const generatePlaylistId = async() => {

        const elements = "qwertyuioplkjhgfdsazxcvbnm0192837465";
        const length = 16;
        let playlistId = ""

        for(let i=0;i<=length;i++){
            let index = Math.floor(Math.random()*length);
            playlistId += elements[index];
        }
        return playlistId;
    }   
    
    export const getCurrentTracks = (user_id, playlist_id) => {
        return new Promise((resolve, reject) => {
    
            const query = `SELECT song_id FROM tblplaylist WHERE playlist_id = ? AND user_id = ?`;
    
            conn.query(query, [playlist_id, user_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
    
                if (results.length === 0 || !results[0].song_id) {
                    return resolve([]);
                }
    
                const songIds = results[0].song_id.split(",").map(id => id.trim());
                resolve(songIds);
            });
        });
    };

    export const setPlaylistTracks = (oldIds, newId) => {
    
        let playlistArray = Array.isArray(oldIds) ? oldIds : [];
    
        if (!playlistArray.includes(newId)) {
            playlistArray.push(newId);
        }
    
        const newString = playlistArray.join(",");
    
        return newString;
    };
    
    export const removeTrackFromPlaylist = (oldIds, trackToRemove) => {
    
        let playlistArray = Array.isArray(oldIds) ? oldIds : [];
    
        playlistArray = playlistArray.filter(track => track !== trackToRemove);
    
        const newString = playlistArray.join(",");
    
        return newString;
    };
    