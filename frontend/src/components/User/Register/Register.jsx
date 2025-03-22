import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import querystring from "querystring";
import axios from "axios";
import logo from "/public/logo.svg";
import Waves from "../../Animations/Wave";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const userDetails = {
    name: name,
    email: email,
    password: password,
    gender: gender,
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
    sessionStorage.setItem("user_details", JSON.stringify(userDetails));
    const client_id = "63fa902a8a9f48528b8b52b2cccf7abf";
    const redirect_uri = `http://localhost:5000/callback`;

    const state = CryptoJS.AES.encrypt(
      JSON.stringify(userDetails),
      "secret_keys"
    ).toString();

    window.location.href =
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scopes.join("%20"),
        redirect_uri: redirect_uri,
        state: state,
      });
    window.open("http://localhost:5173/verification", "_parent");
  };
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    axios
      .post(
        `http://localhost:5000/login`,
        {
          name: loginName,
          password: loginPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.status);

        if (response.status === 200) {
          sessionStorage.setItem(
            "session_details",
            JSON.stringify(response.data)
          );
          window.location.href = "/";
        }
      })
      .catch((error) => {
        return error;
      });
  };

  useEffect(() => {
    let currentlyVisible = ".form-log-in";
    let currentlyHidden = ".form-signup";

    $(".info-item .btn").on("click", function () {
      $(".form-container").toggleClass("active");
      $(currentlyVisible).fadeToggle(150, function () {
        $(currentlyHidden).fadeToggle();
        [currentlyVisible, currentlyHidden] = [
          currentlyHidden,
          currentlyVisible,
        ];
      });
    });

    return () => {
      $(".info-item .btn").off("click");
    };
  }, []);

  return (
    <div>
      {/* <div class="outer-container">
        <div className="absolute rotate-350 scale-125">
          <Waves/>
        </div>
        <div class="container">
          <div class="left-login-logo">
            <img src="/logo.svg" alt="Logo" class="logo" />
            <p class="slogan">Where Every Beat Hits Different</p>
          </div>
          <div class="right-login-logo">
            <img src="/logo.svg" alt="Logo" class="logo" />
            <p class="slogan">Where Every Beat Hits Different</p>
          </div>
          <div class="have-account">
            <div class="info-container">
              <div class="info-item log-in">
                <p>Already have an account?</p>
                <div class="btn" onClick={() => setIslogin(true)}>
                  Login
                </div>
              </div>
              <div class="info-item signup">
                <p>Don't have an account?</p>
                <div class="btn" onClick={() => setIslogin(false)}>
                  Sign Up
                </div>
              </div>
            </div>
          </div>
          <div class="form-container">
            {isLogin && isLogin == true ? (
              <div className="form-log-in mx-4 text-black">
                <div>
                  <p class="login-title">Login Account</p>
                  <p class="login-title-detail">Login to your account</p>
                </div>
                <label className="">Email</label>
                <input
                  className="__register_input__ bg-white rounded outline-0"
                  name="Email"
                  placeholder="Enter User Name"
                  type="email"
                  onChange={(e) => setLoginName(e.target.value)}
                />
                <br />
                <label className="">Password</label>
                <input
                  className="__register_input__ bg-white rounded outline-0 py-5 px-3"
                  name="Password"
                  placeholder="Enter Your Password"
                  type="password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <a href="#">Forget Password?</a>
                <br />
                <div
                  className="__login_btn__ text-center py-2 px-3 rounded"
                  onClick={() => login()}
                >
                  Login
                </div>
              </div>
            ) : (
              <div className="form-signup w-full h-full p-5  text-black">
                <p className="">Sign Up Account</p>
                <p className="">Enter your personal data to create account</p>
                <div className="signup-row name-group my-4">
                  <input
                    className="__register_input__ w-[100%] bg-white rounded outline-0 py-5 px-3"
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <input
                    className="__register_input__ w-[100%] bg-white rounded outline-0 py-5 px-3"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <select
                    className="__register_input__ bg-white rounded outline-0 py-3 px-3 w-[100%]"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option className="text-black" value="#" selected>
                      Choose your gender
                    </option>
                    <option value="male">MALE</option>
                    <option value="female">FEMALE</option>
                  </select>
                </div>
                <div className="my-4">
                  <input
                    className="__register_input__ bg-white rounded outline-0 py-5 px-3"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                  />
                </div>
                <div
                  className="__signup_btn__ w-[100%] text-center py-2 px-3 rounded text-white"
                  onClick={() => register()}
                >
                  Sign Up
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}
       <div className="outer-container flex items-center justify-center min-h-screen bg-gray-900">
      <div className="absolute rotate-350 scale-125">
        <Waves />
      </div>
      <div className="container w-[40rem] bg-indigo-800 p-6 rounded-lg shadow-lg relative">
        {/* Logos */}
        <div className="left-login-logo absolute top-5 left-10 text-center">
          <img src="/logo.svg" alt="Logo" className="logo w-16 h-16 mx-auto" />
          <p className="slogan text-white text-sm">Where Every Beat Hits Different</p>
        </div>
        <div className="right-login-logo absolute top-5 right-10 text-center">
          <img src="/logo.svg" alt="Logo" className="logo w-16 h-16 mx-auto" />
          <p className="slogan text-white text-sm">Where Every Beat Hits Different</p>
        </div>

        <div className="have-account flex justify-center space-x-6 my-4">
          <div className="info-item log-in text-center">
            <p className="text-white">Already have an account?</p>
            <button className="btn bg-white text-indigo-800 px-4 py-2 rounded-lg font-bold shadow-md hover:bg-yellow-400 transition" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </div>
          <div className="info-item signup text-center">
            <p className="text-white">Don't have an account?</p>
            <button className="btn bg-white text-indigo-800 px-4 py-2 rounded-lg font-bold shadow-md hover:bg-yellow-400 transition" onClick={() => setIsLogin(false)}>
              Sign Up
            </button>
          </div>
        </div>

        <div className="form-container bg-yellow-400 p-6 rounded-lg shadow-lg transition-all duration-500">
          {isLogin && isLogin == true ? (
            <div className="form-log-in text-black space-y-4">
              <div className="text-center">
                <p className="text-lg font-bold">Login Account</p>
                <p className="text-sm text-gray-700">Login to your account</p>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">Email</label>
                <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" name="Email" placeholder="Enter your email" type="email" onChange={(e) => setLoginName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">Password</label>
                <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" name="Password" placeholder="Enter Your Password" type="password" onChange={(e) => setLoginPassword(e.target.value)} />
              </div>

              <div className="flex justify-between items-center">
                <a href="#" className="text-blue-600 text-sm">Forgot Password?</a>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition" onClick={login}>
                Login
              </button>
            </div>
          ) : (
            <div className="form-signup text-black space-y-4">
              <p className="text-lg font-bold">Sign Up Account</p>
              <p className="text-sm text-gray-700">Enter your personal data to create an account</p>

              <div className="space-y-2">
                <label className="block font-semibold">Full Name</label>
                <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">Email</label>
                <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">Gender</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option className="text-gray-500" value="#" disabled>Choose your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">Password</label>
                <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Enter your password" />
              </div>

              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition" onClick={register}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
      <style>
        {`
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
              .__register_input__{
                box-shadow: 5px 5px 0px #4949bf;
                
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
              }`}
      </style>
    </div>
    
/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */
  );
};

export default Register;
