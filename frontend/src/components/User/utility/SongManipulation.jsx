import axios from "axios";
const session_details = sessionStorage.getItem("session_details");

export const Play = async(contextUri,device_id,type,position_ms) =>  {
    try {

        if(session_details){

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

export const  getCurrentState = async(device_id) => {
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
            const  response = await axios.get(`http://localhost:5000/playlist/user?session_details=${session_details}`,{
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

export const getQueue = async(device_id) => {
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

export const getReportData = async(streaming_time,listened_artist,listened_songs) => {
    try {

        const response = await axios.post(`http://localhost:5000/report?session_details=${session_details}`,
            {
                "streaming_time":streaming_time,
                "listened_artist":listened_artist,
                "listened_songs":listened_songs
            },
            {
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(response.status === 200){
            console.log("Report Stored");
        }

    } catch (error) {
        return error
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
