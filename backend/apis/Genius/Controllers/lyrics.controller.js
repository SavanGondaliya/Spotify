import axios from "axios";
import * as cheerio from "cheerio";
import unidecode from "unidecode";
import sanscript from "sanscript"

const API_KEY = process.env.GENIUS_KEY;
console.log(API_KEY);

export const searchsong = async(song_name) => {
    try {
        
        const url = "https://api.genius.com/search"

        const response = await axios.get(url,{
            headers:{
                "Authorization":`Bearer ${API_KEY}`
            },
            params:{
                q:`${song_name}`
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
        const song_name = req.query.song_name;
       
        const songUrl = await searchsong(song_name);
        console.log(songUrl);
        
        const lyrics = await scrapLyrics(songUrl); 
        console.log(lyrics);
        
        let cleanedLyrics = unidecode(lyrics).replace(/\[.*?\]/g,"");
        let filteredLyrics = cleanedLyrics.replace(/([a-z])([A-Z])/g,"$1\n$2");
        let lines = filteredLyrics.split("\n")

        return res.status(200).send(lines)
        
    } catch (error) {
        console.log(error);
        
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

