import { useState, useEffect } from "react";
import logo from "/public/Noizee For Artists.svg";
import axios from "axios";

const ArtistRegister = () => {

    const [name, setName] = useState("");
    const [image, setFileName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio,setBio] = useState("");
    const [genre,setGenre] = useState("");
    const [loginName,setLoginName] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

    const loginDetails = {
        "username": loginName,
        "password": loginPassword
    }

    const handleRegister = () => {

        const formData = new FormData();
        formData.append("name",name)
        formData.append("image",image)
        formData.append("email",email)
        formData.append("genre",genre)
        formData.append("password",password)
        formData.append("bio",bio)
        
        axios.post(`http://localhost:5000/artist/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then((res) => {
            if(res.status === 200){
                console.log("Register Successfully.");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleLogin = () => {
        console.log('called');
            console.log(loginName,loginPassword);
            
        axios.post(`http://localhost:5000/artist/login`,{
            "name":loginName,
            "password":loginPassword
        },{
            "headers":{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                sessionStorage.setItem("artistDetails",JSON.stringify(res.data))
                window.location.href = "http://localhost:5173/artist/dashboard"
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        let currentlyVisible = ".form-log-in";
        let currentlyHidden = ".form-signup";
    
        $(".info-item .btn").on("click", function () {
          $(".form-container").toggleClass("active");
          $(currentlyVisible).fadeToggle(150, function () {
            $(currentlyHidden).fadeToggle();
            [currentlyVisible, currentlyHidden] = [currentlyHidden, currentlyVisible]; // Swap variables
          });
        });
    
        return () => {
          $(".info-item .btn").off("click"); // Cleanup event listeners to prevent memory leaks
        };
    }, []);    

    return (
        <div class="outer-container">
            <div class="container">
            <div class="left-login-logo">
                <img src={logo} alt="Logo" class="logo" />
                <p class="slogan">Where Every Beat Hits Different</p>
            </div>
            <div class="right-login-logo">
                <img src={logo} alt="Logo" class="logo"/>
                <p class="slogan">Where Every Beat Hits Different</p>
            </div>
            <div class="have-account">
                <div class="info-container">
                    <div class="info-item log-in">
                        <p>Already have an account?</p>
                        <div class="btn">Login</div>
                    </div>
                    <div class="info-item signup">
                        <p>Don't have an account?</p>
                        <div class="btn">Sign Up</div>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <div class="form-log-in">
                    <p class="login-title">Login Account</p>
                    <p class="login-title-detail">Login to your account</p><br/>
                    <div>
                        <input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Enter The Username"/>
                    </div>
                    <div>
                        <input type="text" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter The password" />
                    </div>
                    <div>
                        <button onClick={() => handleLogin()}>Login</button>
                    </div>
                </div>
                <div className="form-signup" style={{"display": "none"}}>
                    <div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter The Artist Name" />
                    </div>
                    <div>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter the email" />
                    </div>
                    <div>
                        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Enter the Genre" />
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={(e) => setFileName(e.target.files[0])} 
                        />
                    </div>
                    <div>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter the Password" />
                    </div>
                    <div>
                        <textarea type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={() => handleRegister()}>Register</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <style jsx>{`
            
        ::placeholder {
            color: #7d7da0;
            font-size: .75rem;
        }

        a {
            text-decoration: none;
            color: #404040;
            margin-left: .7em;
            font-weight: 500;
            position: relative;
            top: .1em;
            font-size: .8rem;
        }

        input {
            font-family: "teko";
            font-weight: 500;
            height: .8em;
            border: none;
            border-radius: 5px;
            box-shadow: 5px 5px 0px 1px #4949bf;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: teko;
        }

        .outer-container {
            background-color: #05040c;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .container {
            background-color: #282870;
            width: 39em;
            height: 15em;
            display: flex;
            position: relative;
            border-radius: 5px;
            box-shadow: 10px 10px 0px 1px #4949bf;
        }

        .form-container {
            margin-left: 25px;
            background-color: #f2c178;
            height: 25em;
            width: 18.4em;
            align-self: center;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: absolute;
            transition: margin-left 1.5s;
            border-radius: 8px;
            box-shadow: 10px 10px 0px 1px rgba(147, 93, 7, 1);
        }

        .form-container.active {
            margin-left: 19.4em;
        }

        .form-container input {
            display: block;
            padding: 10px;
            /* width: 250px; */
            margin: 5px;
        }

        .form-container .btn {
            cursor: pointer;
            display: block;
            padding: 7px;
            font-weight: 600;
            width: 13.5em;
            margin: 5px;
            font-size: 1em;
            text-align: center;
            background-color: #282870;
            box-shadow: 5px 5px 0px 1px #4949bf;
            border-radius: 8px;
            color: white;
            opacity: 1;
            position: relative;
            top: .7em;
        }

        .form-container .btn:hover {
            opacity: 0.7;
        }

        .info-container {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .form-container input {
            width: 16em;
        }

        .info-item {
            width: 40%;
            color: white;
            font-weight: 500;
            margin-left: 2.4em;
            margin-top: 1.7em;
            font-size: 1.2rem;
            text-align: center;
        }
        
        .info-item p {
            width: 25em;
            position: relative;
            top: 1.6em;
            right: 5em;
        }
        .have-account{
            top: 3.6em;
            position: relative;
            right: 2em;
            width: 95%;
        }
        
        .info-item .btn {
            top: 1em;
            cursor: pointer;
            background-color: transparent;
            width: 4em;
            font-weight: bold;
            padding: 5px 10px;
            left: 6.2em;
            position: relative;
            color: #282870;
            background-color: #ffffff;
            box-shadow: 5px 5px 0px 1px #4949bf;
            border-radius: 8px;
            font-size: 1rem;
        }

        .info-item .btn:hover {
            scale: 1.1;
            background-color: #f2c178;
            box-shadow: 5px 5px 0px 1px #935d07;
        }

        .login-detail {
            font-weight: 600;
            font-size: .8rem;
            position: relative;
            left: .7em;
            top: .4em;
        }

        .login-title {
            position: relative;
            font-size: 1.7rem;
            font-weight: 600;
            margin-top: -1.2em;
            text-align: center;
            
        }
        
        .login-title-detail {
            top: 8px;
            position: relative;
            font-size: .75rem;
            margin-top: -4em;
            text-align: center;

        }

        .signup-row {
            display: flex;
            position: relative;
        }

        .name-group {
            display: flex;
            justify-content: space-between;
            width: 97%;
            margin-bottom: 1px;
        }

        .name-field {
            width: 48%;
            /* Adjust width as needed */
        }

        .name-field label {
            display: block;
            font-size: .8rem;
            font-weight: 600;
            position: relative;
            top: 5px;
            left: 10px;
        }

        .name-field input {
            width: 6.75em;
        }

        .left-login-logo {
            width: 11em;
            left: 4.7em;
            top: 2.4em;
            position: absolute;
            text-align: center;
        }
        .left-login-logo .slogan{
            position: relative;
            bottom: 1em;
            font-size: 13px;
            color: white;
        }
        .right-login-logo {
            width: 11em;
            right: 4.5em;
            top: 2.4em;
            position: absolute;
            text-align: center;
        }
        .right-login-logo .slogan{
            position: relative;
            bottom: 1em;
            font-size: 13px;
            color: white;
        }
        `}
        </style>
    </div>  
    )
};

export default ArtistRegister;
