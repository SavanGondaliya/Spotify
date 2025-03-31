import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WebPlaybackContext = createContext(null);

export const WebPlaybackProvider = ({ children }) => {
    const session_details = sessionStorage.getItem("secret_key");
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [token, setToken] = useState("");


    const AuthToken = async () => {
        try {
            console.log("Fetching new token...");
            const response = await axios.get(`http://localhost:5000/authToken?session_details=${session_details}`, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                console.log("New token:", response.data);
                setToken(response.data); // Store the new token
            }
        } catch (error) {
            console.error("Error fetching auth token:", error);
        }
    };

    // Fetch token on mount
    useEffect(() => {
        AuthToken(); 

        const interval = setInterval(AuthToken, 55 * 60 * 1000);

        return () => clearInterval(interval); 
    }, []);

    useEffect(() => {
        if (!token) return; 

        window.onSpotifyWebPlaybackSDKReady = () => {
            const newPlayer = new Spotify.Player({
                name: "My Player",
                getOAuthToken: async (cb) => {
                    console.log("Providing token to player:", token);
                    cb(token);
                },
            });

            newPlayer.connect().then(success => {
                if (success) {
                    setPlayer(newPlayer);
                }
            });

            newPlayer.addListener("ready", ({ device_id }) => {
                setDeviceId(device_id);
            });
        };
    }, [token]);

    return (
        <WebPlaybackContext.Provider value={{ player, deviceId }}>
            {children}
        </WebPlaybackContext.Provider>
    );
};

export const useWebPlayback = () => useContext(WebPlaybackContext);

export default useWebPlayback;
