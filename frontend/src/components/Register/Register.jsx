import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import querystring from "querystring";
import axios from "axios";
import logo from "../../../public/logo.svg";
import "./style.css"

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDateofBirth] = useState("");
  
    const userDetails = {
      "name" : name,
      "email" : email,
      "password" : password,
      "gender" : gender,
      "dob" : dob,
    };
    
    const scopes = [
      "ugc-image-upload",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "app-remote-control",
      "streaming",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-follow-modify",
      "user-follow-read",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
      "user-library-modify",
      "user-library-read",
      "user-read-email",
      "user-read-private",
    ];
    
    const register = () => {
      
      sessionStorage.setItem("user_details",JSON.stringify(userDetails));
      const client_id = "63fa902a8a9f48528b8b52b2cccf7abf";
      const redirect_uri = `http://localhost:5000/callback`;

      const state = CryptoJS.AES.encrypt(
        JSON.stringify(userDetails),
        "secret_keys"
      ).toString();
  
      window.location.href =  'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scopes.join("%20"),
          redirect_uri: redirect_uri,
          state: state,
      });
      window.open('http://localhost:5173/verification',"_parent");
    }  
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLogin,setIsLogin] = useState(true);
  
    const login = async() => {

      const userDetails = {
        name: loginName,
        password: loginPassword,
      };
      
      
      axios
        .post(`http://localhost:5000/login`,{
          "name":loginName,
          "password":loginPassword
        },
        {
          headers:{
            "Content-Type":"application/json"
            }
          }
        ).then((response) => {
            if (response.status === 200) {
            sessionStorage.setItem(
              "session_details",
              JSON.stringify(response.data)
            );
            window.location.href = "/";
          }
        }).catch((error) => {
          return error;
        });
    };  

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-indigo-700 w-fit h-full flex relative rounded">
        <div className="w-fit max-w-full text-center left-1 top-1 absolute">
          <img src={logo} alt="" />
          <p className="relative bottom-1 text-2xl text-white">Where Every Beat Hits Different</p>
        </div>
        <div className="min-w-fit max-w-full right-2 text-center">
          <img src={logo} alt="" />
          <p className="relative bottom-2 text-2xl text-white">Where Every Beat Hits Different</p>
        </div>
        <div className="top-1 relative right-1 max-w-full">
          <div className="w-full flex justify-around items-center">
            <div className="">
              <p className="w-2 relative top-1.5 right-5">Already have an account?</p>
              <div className="cursor-pointer w-full font-bold px-5 py-2 left-3.2 relative bg-amber-100 text-2xl rounded hover:scale-100 hover:bg-amber-300">Login</div>
            </div>
            
            <div className="">
              <p className="w-2 relative top-1.5 right-5">Don't have an account?</p>
              <div className="cursor-pointer w-full font-bold px-5 py-2 left-3.2 relative bg-amber-100 text-2xl rounded hover:scale-100 hover:bg-amber-300">Sign Up</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-amber-200 absolute transition">
          <div>
            <div>
              <p>First Name</p>
              <div>
                <input
                  type="text"
                  placeholder="Joan"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p>Email</p>
              <div>
                <input
                  type="text"
                  placeholder="savangondaliya0@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <p>Gender</p>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="0">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <p>DOB</p>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDateofBirth(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <p>Password</p>
                <input
                  type="text"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button onClick={() => register()}>Register</button>
            </div>
          </div>

          <div>
            <div>
                <div className="">
                    <p>Email</p>
                    <input 
                        type="text" 
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                        placeholder="Enter UserName"
                    />
                </div>
                <div>
                    <p>Password</p>
                    <input 
                        type="text" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter The password"
                    />
                </div>
                <div>
                  <button onClick={() => login()}>
                    Login
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  )
};

export default Register;
