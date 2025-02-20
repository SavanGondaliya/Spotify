import axios from "axios";

const API_KEY = `${process.env.MUSIXMATCH_KEY}`;
export const getLyrics = async(req,res) => {
    try {
                
        const {track, artist} = req.query; 

        const  response = await axios.get(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${track}&q_artist=${artist}&apikey=${API_KEY}`,{
            headers:{
                "Content-Type" : "application/json",
            }
        });

        if(response.status == 200){
            return res.status(200).send(response.data);
        }
        return res.status(response.status).send({message : response.statusText});
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const tester = async(req, res) => {
    try {
        const response = await axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=5920049&apikey=${API_KEY}`,{
            headers:{
                "Content-Type" : "application/json"
            }
        });
        if(response.status === 200){
            return res.status(200).send(response.data)
        }
        return res.status(response.status).send({message : response.data});
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}