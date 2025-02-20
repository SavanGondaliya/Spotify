import conn from "../../../index.js";
import querystring from "querystring";
import axios from "axios";


const loggedUserDetails = async(columns,userDetails) => {
  try {

    const {user_id}  = userDetails;
    
    const query = `SELECT ${columns} FROM tbluser WHERE user_id='${user_id}';`;
    
    return new Promise((resolve,reject) => {
      conn.query(query,(error,results) => {
        if(error){
          reject(error)
        }
        resolve(results[0]);
      }); 
    })
  } catch (error) {
    return error;
  }
}

export const getAccessToken = async (userDetails) => {
  try {
    
    const {session_details} = await loggedUserDetails("session_details", userDetails);
    const accessToken = session_details.access_token;

    return accessToken;
    
  } catch (error) {
    throw error; 
  }
};

export const isTokenExpired = async(userDetails) => {
  try{
    
    const expriseIn = 3600000;
    const currentTime = Date.now();
    const {updated_at} = await loggedUserDetails("updated_at",userDetails);
    const issuedAt = new Date(updated_at).getTime();
    
    if(currentTime >= (expriseIn + issuedAt)){
      return true;
    }
    return false;
  }
  catch(error){
    return error
  }
}

const updateSessionDetails = (tokenDetails,userDetails) => {
  try {
    
    const {user_id} = userDetails;
    const updatedToken = JSON.stringify(tokenDetails)
    
    const query = `UPDATE tbluser SET session_details = '${updatedToken}' WHERE user_id = '${user_id}';`;

    conn.query(query,(error) => {
      if(error){
        return error
      }else{
        return
      }
    })
  } catch (error) {
    return error
  }
}

export const refreshToken  = async(userDetails) => {
  try {
    
    const {session_details} = await loggedUserDetails("session_details",userDetails);
    const tokenData = querystring.stringify({
      grant_type : "refresh_token",
      refresh_token: session_details.refresh_token,
      client_id : process.env.CLIENT_ID,
      client_secret : process.env.CLIENT_SECRET
    });
    
    const response = await axios.post(`https://accounts.spotify.com/api/token`,tokenData,{
      headers:{
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    });
    
    if(response.status === 200){
      const tokenDetails = response.data;
 
      if(!Array(Object.keys(tokenDetails)).includes("refresh_token")){
        tokenDetails["refresh_token"] = session_details.refresh_token;
      }
      await updateSessionDetails(tokenDetails,userDetails);
      return tokenDetails.access_token;
    }
    
  } catch (error) {
    return error;
  }
}

export const userToken = async(userDetails) => {
  
  let accessToken = null;
  
  try{
    const isTokenValid = await isTokenExpired(userDetails);
    
    if(isTokenValid){
      accessToken = await refreshToken(userDetails);
    }else{
      accessToken = await getAccessToken(userDetails); 
    }
    return accessToken;
  }
  catch(error){
    return error
  }
}

export default userToken;
