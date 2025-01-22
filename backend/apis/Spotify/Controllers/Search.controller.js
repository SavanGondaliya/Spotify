import axios from "axios";
import { accessToken } from "../../../config.js";

export const search = async(req,res) => {
    console.log("Function Invoked");
    
    if(!accessToken || accessToken == ""){
        return res.status(401).send({message : "UnAuthorized User"})
    }   
    const q = req.query.name;
    if(!q){
        return res.status(400).send({message : "Parameter 'name' is required "})
    }

    const type = "track";
    const market = "IN";
    const limit = 10;
    const offset = 0;
    const include_external = "audio"

    const params = new URLSearchParams({
        q,type,market,limit,offset,include_external
    }).toString()
    console.log(params);
    

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?${params}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`
            }
        }
    )
    console.log(response.status);
    
    if(response.status == 200){
        return res.status(200).send(response.data)
    }
    return res.status(400).send({message : "Item Not Found"})

    } catch (error) {
        return res.status(500).status({message: error.message})
    }
}