import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const EmailVerified = () => {

    const [searchParams] = useSearchParams()

    const goToHome = () => {
        try {
            sessionStorage.setItem("session_details",{"name":name,"password":password});
            window.open("http://localhost:5173/","_parent")
        } catch (error) {
            return 0;            
        }
    }

    useEffect(() => {

        const mailToVerify = searchParams.get("verifyDetails")
        const decryptedMessage = CryptoJS.AES.decrypt(mailToVerify,"session");         
        const {name,passowrd,email} = decryptedMessage.toString(CryptoJS.enc.Utf8);
        console.log(name,email,passowrd);
        
        if(!mailToVerify){
            return            
        }
                        
        if(mailToVerify != null){
            
            axios.get(`http://localhost:5000/email/verify?verifyEmail=${email}`,{
                headers:{
                    "Content-Type":"application/json",
                }
            }).then((response) => {
                if(response.status === 200){
                   
                }
            }).catch((error) => {
                console.log(error);
            });
        }else{
            return;
        }
    },[searchParams]);
    
    return (
        <div>
            <div className="w-full h-full flex flex-col justify-evenly items-center">
                <div className="mt-5">
                    <img className="w-50 h-50" src="/logo.svg" alt="" />
                </div>
                <div className="flex flex-col bg-indigo-700 p-10 rounded text-center">
                    <div>
                        <h1 className="text-2xl text-white">Your Email is Verfied SuccessFully.</h1>
                        <h1 className="text-2xl text-white">Now You Can Close This Window and Enjoy the Music</h1>
                    </div>
                    <div>
                        <button onClick={goToHome} className="bg-indigo-800">Go To Home</button>
                    </div>
                </div>
            </div> 
        </div>
    )

}

export default EmailVerified;