import React, { createContext, useContext,useState, useEffect } from "react";
import axios from "axios";

const session_details = sessionStorage.getItem("secret_key");
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
    const [deviceId, setDeviceId] = useState(null);

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
            newPlayer.addListener("ready",({device_id}) => {
                console.log(device_id);
                setDeviceId(device_id)
            })
        };
    }, []);

    return (
        <WebPlaybackContext.Provider value={{ player, deviceId}}>
            {children}
        </WebPlaybackContext.Provider>
    );
};

export const useWebPlayback = () => useContext(WebPlaybackContext);