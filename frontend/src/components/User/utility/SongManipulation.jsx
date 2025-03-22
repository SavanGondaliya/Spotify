import axios from "axios";
const secret_key = sessionStorage.getItem("secret_key");
const session_details = sessionStorage.getItem("session_details");


export const Play = async(contextUri,device_id,type,position_ms) =>  {
    try {
        console.log(contextUri,device_id,type,position_ms);
        
        if(session_details){
            updateReport(device_id);
            const response = await axios.get(`http://localhost:5000/play/${type}/${contextUri}?session_details=${session_details}&deviceId=${device_id}&position_ms=${position_ms}`,{
                headers:{
                    "Content-Type" :"application/json"
                }
            });
            if(response.status == 200){
                return true;
            }
        }else{
            window.location.href = "/auth/user"
        }
        } catch (error) {
            console.log(error);
        }
}

export const Pause = async(id,device_id) => {
    
    try {
        const response = await axios.get(`http://localhost:5000/pause/${id}?session_details=${session_details}&deviceId=${device_id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}

export const skipToNext = (device_id) => {
    try {

        const response = axios.get(`http://localhost:5000/track/next?session_details=${session_details}&deviceId=${device_id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200  ){
            return true 
        }
    } catch (error) {
        console.log(error);
    }
}


export const skipToPrevious = (device_id) => {
    try {

        const response = axios.get(`http://localhost:5000/track/next?session_details=${session_details}&deviceId=${device_id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return true
        }
    } catch (error) {
        console.log(error);
    }
}

export const seekSong = async(position_ms,deviceId) => {
    try {
        
        const response = await axios.get(`http://localhost:5000/track/seek?session_details=${session_details}&position_ms=${position_ms}&deviceId=${deviceId}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        
        if(response.status === 200){
            return response.data
        }

    } catch (error) {
        return error;
    }
}

export const getCurrentState = async(device_id) => {
    try {
        const response = await axios.get(`http://localhost:5000/playback?session_details=${session_details}&deviceId=${device_id}`,{
            headers:{
                "Content-Type" : "application/json"
            }
        });
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        return error        
    }
}

export const songDuration = (position) => {
    
    let minute = Math.floor((position/1000) / 60)
    let second = Math.floor((position/1000) % 60)
    
    return `${minute} : ${second < 10 ? '0'+second : second}`
    
}

export const setVolume = async(volume,device_id) => {
    try {

        const response = await axios.get(`http://localhost:5000/track/volume?session_details=${session_details}&volume=${volume}&deviceId=${device_id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return true
        }

    } catch (error) {
        return error;
    }
}

export const  RepeatMode = async(device_id,state) => {
    try {
        
        if(state == "track"){
            state = "track"
        }
        else if(state == "context"){
            state = "context"
        }
        else{
            state = "off"
        }
        
        const response = await axios.get(`http://localhost:5000/repeat?session_details=${session_details}&deviceId=${device_id}&state=${state}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return true;
        }
    } catch (error) {
        return error;
    }
}

export const getUserPlaylist = async() => {
    try {
        
        if(session_details){
            const {user_id} = JSON.parse(sessionStorage.getItem("session_details"));
            
            const  response = await axios.get(`http://localhost:5000/playlist/${user_id}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200) {
               return response.data;
            }
        }
        else{
            return
        }

    } catch (error) {
        return error;
    }
}

export const addTrackToPlaylist = async(playlist_id,id) => {
    try {
        
        const response = await axios.post(`http://localhost:5000/playlist/${playlist_id}/add/${id}?session_details=${session_details}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return true
        }

    } catch (error) {
        return error
    }
}

export const deleteFromPlaylist = async(playlist_id,id) => {
    try {   
        
        const response = await axios.delete(`http://localhost:5000/playlist/${playlist_id}/delete/${id}?session_details=${session_details}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return true;
        }
    } catch (error) {
        return error;
    }
}


export const addToQueue = async(device_id,id) => {
    try {
        const url = `http://localhost:5000/queue/${id}?deviceId=${device_id}&session_details=${encodeURIComponent(session_details)}`;
        console.log(url);
        
        const response = await axios.get(url,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            console.log("Added to Queue");
        }

    } catch (error) {
        return error
    }
}

export const getQueue = async() => {
    
    try {  
        const response = await axios.get(`http://localhost:5000/queue?session_details=${session_details}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        return error
    }
}

export const updateMonthlyReport = async(streaming_time,listened_artist,listened_songs) => {
    try {
        console.log(streaming_time,listened_artist,listened_songs);
        
        axios.post(`http://localhost:5000/user/report`,{
            "userId":JSON.parse(session_details)?.user_id,
            "artists":listened_artist,
            "song":listened_songs,
            "timeSpent":streaming_time
        },{
            "headers":{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                return res.data            
            }
        }).catch((error) => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

export const addToLibrary = (ids) => {
    try {
        console.log("called",ids);
        
        axios.get(`http://localhost:5000/tracks/save/${ids}?session_details=${session_details}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                console.log("added To liked");
            }
        }).catch((error) => {
            console.log(error);
        })

    } catch (error) {
        return error        
    }
}

export const removeFromLibrary = (ids) => {
    try {   
        axios.get(`http://localhost:5000/tracks/delete/${ids}?session_details=${session_details}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                console.log("track deleted");
            }
        }).catch((error) => {
            console.log(error);
        })
    } catch (error) {
        return error;
    }
}

const updateReport = async(device_id) => {
    
        console.log("called....");
        const response = await getCurrentState(device_id);
        console.log(response);
        let artists = response?.item?.artists.map((element) => element.id)
                                    
        updateMonthlyReport(
            response?.progress_ms,
            artists,
            response?.item?.id
        )    
}
export const PlayRandom = async (device_id) => {
    try {
        const res = await axios.get(`http://localhost:5000/local/tracks`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const listLength = res.data.length;
        if (listLength === 0) return; // Prevent errors if list is empty

        const randomIndex = Math.floor(Math.random() * listLength);
        const { song_id } = res.data[randomIndex];

        Play(song_id, device_id, "track", 0);
    } catch (error) {
        console.error("Error fetching random track:", error);
    }
};
