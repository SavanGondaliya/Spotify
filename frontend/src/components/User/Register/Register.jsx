import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import querystring from "querystring";
import axios from "axios";
import Waves from "../../Animations/Wave";
import { NavLink } from "react-router-dom";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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



  const login = async () => {

    if(loginName == ""|| loginPassword == ""){
      console.log("Every Field Should be filled");
      
    }

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
      <div className="outer-container flex items-center justify-center min-h-screen bg-gray-900">
        <div className="absolute rotate-350 scale-120">
          <Waves />
        </div>
        <div className="container  bg-indigo-800  rounded-lg shadow-lg relative">
          <div className="flex justify-center items-center flex-col absolute left-28 text-center">
            <img className="w-30 h-30" src="/logo.svg" alt="Logo" />
            <p className="slogan text-white text-sm">
              Where Every Beat Hits Different
            </p>
          </div>
          <div className="flex justify-center items-center flex-col mx-25 absolute right-10 text-center">
            <img src="/logo.svg" alt="Logo" className="w-30 h-30" />
            <p className="slogan text-white text-sm">
              Where Every Beat Hits Different
            </p>
          </div>

          <div className="have-account flex left-1 justify-center gap-10 my-4 mx-8">
            <div className="info-item text-center">
              <p className="text-white mb-2">Already have an account?</p>
              <div
                className="btn __swap_btn__  py-2 rounded font-bold shadow-md transition"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                Login
              </div>
            </div>
            <div className="info-item text-center">
              <p className="text-white mb-2">Don't have an account?</p>
              <div
                className="btn __swap_btn__  py-2 rounded font-bold shadow-md transition"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                Sign Up
              </div>
            </div>
          </div>

          <div className="form-container  p-6 rounded-lg shadow-lg transition-all duration-500">
            {isLogin && isLogin == true ? (
              <div className="form-log-in text-black space-y-4">
                <div className="text-center">
                  <p className="text-lg font-bold">Login Account</p>
                  <p className="text-sm text-gray-700">Login to your account</p>
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold">Email</label>
                  <input
                    className="w-full p-3 __input_shadows__  rounded outline-0 bg-white"
                    name="Email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={(e) => setLoginName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold">Password</label>
                  <input
                    className="w-full p-3 __input_shadows__ rounded outline-0 bg-white"
                    name="Password"
                    placeholder="Enter Your Password"
                    type="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <NavLink to={`/forgotpassword`} className="text-sm">
                    Forgot Password?
                  </NavLink>
                </div>

                <div
                  className="w-full py-3 __register_btn__ text-white text-center rounded font-bold shadow-md transition"
                  onClick={() => {
                    login();
                  }}
                >
                  Login
                </div>
              </div>
            ) : (
              <div className="form-signup text-black flex justify-center flex-col ">
                <p className="text-lg font-bold text-center">Sign Up Account</p>
                <p className="text-sm text-gray-700 text-center">
                  Enter your personal data to create an account
                </p>

                <div className="space-y-1">
                  <label className="block font-semibold">Full Name</label>
                  <input
                    className="w-full p-3 __input_shadows__ bg-white outline-0 rounded"
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold">Email</label>
                  <input
                    className="w-full p-3 __input_shadows__ bg-white outline-0 rounded "
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold">Gender</label>
                  <select
                    className="w-full p-3 __input_shadows__ bg-white outline-0 rounded"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option className="text-gray-500" value="#" disabled>
                      Choose your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold">Password</label>
                  <input
                    className="w-full __input_shadows__ bg-white outline-0 p-3 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                  />
                </div>

                <div
                  className="w-full text-center __register_btn__ py-3 my-5 text-white rounded font-bold transition "
                  onClick={register}
                >
                  Sign Up
                </div>
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

              .__input_shadows__{
                box-shadow: 5px 5px 0px #4949bf; 
              }

              .__register_btn__{
                background-color: #282870;
                box-shadow : 5px 5px 0px #4949bf
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
                  width: 50em;
                  height: 20em;
                  display: flex;
                  position: relative;
                  border-radius: 5px;
                  box-shadow: 10px 10px 0px 1px #4949bf;
              }

              .form-container {
                  margin-left: 70px;
                  background-color: #f2c178;
                  height: 30em;
                  width: 20em;
                  align-self: center;
                  position: absolute;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  position: absolute;
                  transition: margin-left 1.5s;
                  border-radius: 8px;
              }

              .form-container.active {
                  margin-left: 25em;
              }

              .form-container input {
                  display: block;
                  padding: 5px;
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
                  width: 50%;
                  color: white;
                  font-weight: 500;
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
                  width: 100%;
              }
              
              .info-item .btn {
                  top: 2em;
                  cursor: pointer;
                  background-color: transparent;
                  width: 5em;
                  font-weight: bold;
                  padding: 5px 10px;
                  left: 6.2em;
                  position: relative;
                  color: #282870;
                  background-color: #ffffff;
                  box-shadow: 5px 5px 0px 1px #4949bf;
                  font-size: 1rem;
              }

              // .info-item .btn:hover {
              //     scale: 1.1;
              //     background-color: #f2c178;
              //     box-shadow: 5px 5px 0px 1px #935d07;
              // }

              .__swap_btn__{
                background-color: white
              }
              `}
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
