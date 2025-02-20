import conn from "../../../index.js";
import request from "request";
import  querystring from "querystring";
import CryptoJS from "crypto-js";
import { isTokenExpired,getAccessToken,refreshToken } from "../Helpers/Auth.helper.js";

const client_id = `${process.env.CLIENT_ID}`;
const redirect_uri = `http://localhost:5000/callback`;
const client_secret = `${process.env.CLIENT_SECRET}`;

export const createUniqueId = () => {
    try {
        const elements = "abcdefghijklmnopqrstuvwxyz123456789";
        const length = 16;
        
        let userId = "";
        for(let i=0;i<length;i++){
            
            let index = Math.floor(Math.random()*elements.length) ;
            userId += elements[index];
        }
        return userId;
    } catch (error) {
        return error;
    }
}

export const callback = async (req, res) => {
    
    try {

        let code = req.query.code || null;
        let state = req.query.state || null;
        
        if (state === null) {
            res.redirect(
                '/#' +
                querystring.stringify({
                    error: 'state_mismatch',
                })
            );
        } else {

            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code',
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
                },
                json: true,
            };
            
            
            request.post(authOptions, (error, response,body) => {
                if (!error && response.statusCode === 200) {
                    if (response.statusCode === 200) {

                        const session_details = JSON.stringify(body);
                        const decrypted = CryptoJS.AES.decrypt(state,"secret_keys");
                        const plaintText = decrypted.toString(CryptoJS.enc.Utf8);    
                        const userId =  createUniqueId();
                        const {name, email, password, dob, gender} = JSON.parse(plaintText);
                        
                        const query = `INSERT INTO tbluser(user_id, name, email, password, dob, gender, session_details) VALUES('${userId}','${name}','${email}','${password}','${dob}','${gender}','${session_details}');`;
                        
                        if (session_details) {
                            conn.query(query, (err) => {
                                if (err) {
                                    return res.status(401).json({ message: "Database error" });
                                } else {
                                    res.redirect("http://localhost:5173/register")
                                }
                            });
                        }
                    }
                } else {
                    res.status(400).json({ error: "Failed to fetch tokens" });
                }
            });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const login = (req,res) => {
    try {
        const {name,password} = req.body;
        const userInformation = `SELECT user_id FROM tbluser WHERE name='${name}' and password='${password}';`
        
        conn.query(userInformation,(err,results,fields) => {
            if(err){
                return res.status(404).send({message:"Wrong Credentials"});
            }
            if(results != null){
                return res.status(200).send(results);
            }
        });
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}


export const userToken = async(req,res) => {
   
    try{
    
        let accessToken = null;  
    
        const userDetails = JSON.parse(req.query.session_details);  
        const isTokenValid = await isTokenExpired(userDetails);
        
        if(isTokenValid){
        accessToken = await refreshToken(userDetails);
        }else{
        accessToken = await getAccessToken(userDetails); 
        }
        return res.status(200).send(accessToken);
    }
    catch(error){
        
        return res.status(500).send({message : error.message});
    }
}
