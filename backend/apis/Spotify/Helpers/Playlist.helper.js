import axios from "axios";
import path from "path"
import fs from "fs"
import { accessToken,localStorage } from "../../../config.js";
import { match } from "assert";

    export const getSnapshotId = async(req,res) => {
        console.log('Function Invoked.');
        
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
                console.log(snapshotId);
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