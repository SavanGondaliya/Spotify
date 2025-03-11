import axios from "axios";
import * as cheerio from "cheerio";
import unidecode from "unidecode";
const API_KEY = process.env.GENIUS_KEY;

export const searchsong = async(song_name) => {
    try {
        
        const url = `https://api.genius.com/search?q=${song_name}`
        console.log(url);
        
        const response = await axios.get(url,{
            headers:{
                "Authorization":`Bearer ${API_KEY}`
            }
        });
        const hits = response.data.response.hits
        
        if (hits.length > 0) {
            return hits[0].result.url; 
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
}

export const fetchLyrics = async(req, res) => {
    try {

        const {song_name,artist_name} = req.query;
        const songUrl = await searchsong(song_name,artist_name);       
        console.log(songUrl);
        
        const lyrics = await scrapLyrics(songUrl); 

        let cleanedLyrics = unidecode(lyrics).replace(/\[.*?\]/g,"");
        let filteredLyrics = cleanedLyrics.replace(/([a-z])([A-Z])/g,"$1\n$2");
        let lines = filteredLyrics.split("\n")
        return res.status(200).send(lines)
        
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
}

export const scrapLyrics = async(songUrl) => {
    try {
        const {data} = await axios.get(songUrl)
        const $  = cheerio.load(data);

        let lyrics  = $(".lyrics").text().trim();
        if(!lyrics){
            lyrics = $("div[data-lyrics-container]").text().trim();
        }

        return lyrics || "Lyrics not found.";
    } catch (error) {
        console.log(error);
        
        return error
    }
}

