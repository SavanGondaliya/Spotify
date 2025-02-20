import React, { createContext, useContext,useState, useEffect } from "react";
import axios from "axios";

const session_details = sessionStorage.getItem("session_details");
const AuthToken = async() => {
    
    const response = await axios.get(`http://localhost:5000/authToken?session_details=${session_details}`,{
        headers:{
            "Content-Type":"application/json"
        }
    });

    if(response.status === 200){
        return response.data
    }
}

const WebPlaybackContext = createContext(null);

export const WebPlaybackProvider = ({ children }) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = async () => {
            const token = await AuthToken();
            const newPlayer = new Spotify.Player({
                name: "My Spotify Player",
                getOAuthToken: cb => cb(token),
            });

            newPlayer.connect().then(success => {
                if (success) {
                    console.log("Spotify Player Connected");
                    setPlayer(newPlayer);
                }
            });
        };
    }, []);

    return (
        <WebPlaybackContext.Provider value={player}>
            {children}
        </WebPlaybackContext.Provider>
    );
};

export const useWebPlayback = () => useContext(WebPlaybackContext);