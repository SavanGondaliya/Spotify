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
                    setToken(response.data);
                } else {
                    console.error("Failed to fetch token:", response);
                }
            } catch (error) {
                console.error("Error fetching auth token:", error);
            }
        };
        
        useEffect(() => {
            AuthToken(); 

            const interval = setInterval(AuthToken, 55 * 60 * 1000);

            return () => clearInterval(interval); 
        }, []);

        useEffect(() => {
            if (!token) return;
        
            const initializePlayer = () => {
                console.log("Initializing Spotify Player...");
        
                const newPlayer = new Spotify.Player({
                    name: "My Player",
                    getOAuthToken: cb => cb(token),
                });
        
                newPlayer.addListener("ready", ({ device_id }) => {
                    console.log("Player is ready with device ID:", device_id);
                    setDeviceId(device_id);
                });
        
                newPlayer.addListener("authentication_error", ({ message }) => console.error("Auth Error:", message));
                newPlayer.addListener("account_error", ({ message }) => console.error("Account Error:", message));
                newPlayer.addListener("playback_error", ({ message }) => console.error("Playback Error:", message));
        
                newPlayer.connect().then(success => {
                    if (success) {
                        console.log("Player connected successfully");
                        setPlayer(newPlayer);
                    } else {
                        console.error("Failed to connect player");
                    }
                });
            };
        
            if (window.Spotify) {
                initializePlayer();
            } else {
                console.log("Waiting for Spotify SDK...");
                window.onSpotifyWebPlaybackSDKReady = initializePlayer;
            }
        }, [token]);
        
        
        useEffect(() => {
            if (!window.Spotify) {
                const script = document.createElement("script");
                script.src = "https://sdk.scdn.co/spotify-player.js";
                script.async = true;
                script.onload = () => {
                    console.log("Spotify SDK script loaded!");
                };
                document.body.appendChild(script);
            }
        }, []);
        
        console.log(player,deviceId);
        
        return (
            <WebPlaybackContext.Provider value={{ player, deviceId }}>
                {children}
            </WebPlaybackContext.Provider>
        );
    };

    export const useWebPlayback = () => useContext(WebPlaybackContext);

    export default useWebPlayback;
