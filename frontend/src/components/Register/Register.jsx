import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import querystring from "querystring";
import logo from "/logo.svg";

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
      count += 1;
  
      const sessionDetails = JSON.stringify(userDetails);
      axios
        .get(
          `http://localhost:5000/mail/register?userDetails=${sessionDetails}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            window.open("/emailverification", "_self");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLogin,setIsLogin] = useState(true);
  
    const login = async () => {
      const userDetails = {
        name: name,
        password: password,
      };
  
      axios
        .post(`http://localhost:5000/login`, userDetails)
        .then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem(
              "session_details",
              JSON.stringify(response.data)
            );
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };  
    const isRegister  = null;

  return (

      // <div className="bg-indigo-700 w-fit h-full flex relative rounded">
      //   <div className="w-fit max-w-full text-center left-1 top-1 absolute">
      //     <img src={logo} alt="" />
      //     <p className="relative bottom-1 text-2xl text-white">Where Every Beat Hits Different</p>
      //   </div>
      //   <div className="min-w-fit max-w-full right-2 text-center">
      //     <img src={logo} alt="" />
      //     <p className="relative bottom-2 text-2xl text-white">Where Every Beat Hits Different</p>
      //   </div>
      //   <div className="top-1 relative right-1 max-w-full">
      //     <div className="w-full flex justify-around items-center">
      //       <div className="">
      //         <p className="w-2 relative top-1.5 right-5">Already have an account?</p>
      //         <div className="cursor-pointer w-full font-bold px-5 py-2 left-3.2 relative bg-amber-100 text-2xl rounded hover:scale-100 hover:bg-amber-300">Login</div>
      //       </div>
            
      //       <div className="">
      //         <p className="w-2 relative top-1.5 right-5">Don't have an account?</p>
      //         <div className="cursor-pointer w-full font-bold px-5 py-2 left-3.2 relative bg-amber-100 text-2xl rounded hover:scale-100 hover:bg-amber-300">Sign Up</div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="flex flex-col justify-center items-center bg-amber-200 absolute transition">
      //     <div>
      //       <div>
      //         <p>First Name</p>
      //         <div>
      //           <input
      //             type="text"
      //             placeholder="Joan"
      //             onChange={(e) => setName(e.target.value)}
      //           />
      //         </div>
      //       </div>
      //       <div>
      //         <p>Email</p>
      //         <div>
      //           <input
      //             type="text"
      //             placeholder="savangondaliya0@gmail.com"
      //             onChange={(e) => setEmail(e.target.value)}
      //           />
      //         </div>
      //       </div>
      //       <div>
      //         <div>
      //           <p>Gender</p>
      //           <select
      //             value={gender}
      //             onChange={(e) => setGender(e.target.value)}
      //           >
      //             <option value="0">Select Gender</option>
      //             <option value="male">Male</option>
      //             <option value="female">Female</option>
      //           </select>
      //         </div>
      //         <div>
      //           <p>DOB</p>
      //           <input
      //             type="date"
      //             value={dob}
      //             onChange={(e) => setDateofBirth(e.target.value)}
      //           />
      //         </div>
      //       </div>
      //       <div>
      //         <div>
      //           <p>Password</p>
      //           <input
      //             type="text"
      //             placeholder="Password"
      //             onChange={(e) => setPassword(e.target.value)}
      //           />
      //         </div>
      //       </div>
      //       <div>
      //         <button onClick={register}>Register</button>
      //       </div>
      //     </div>

      //     <div>
      //       <div>
      //           <div className="">
      //               <p>Email</p>
      //               <input 
      //                   type="text" 
      //                   value={loginName}
      //                   onChange={(e) => setLoginName(e.target.value)}
      //                   placeholder="Enter UserName"
      //               />
      //           </div>
      //           <div>
      //               <p>Password</p>
      //               <input 
      //                   type="text" 
      //                   value={loginPassword}
      //                   onChange={(e) => setLoginPassword(e.target.value)}
      //                   placeholder="Enter The password"
      //               />
      //           </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    // <div className="bg-black flex flex-col justify-center items-center min-w-dvw min-h-dvh max-w-full max-h-full ">
    //   <div className="bg-indigo-800 min-w-fit min-h-fit max-w-full ">

    //   </div>
    // </div>
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative bg-blue-800 w-[39em] h-[15em] flex rounded-lg shadow-[10px_10px_0px_1px] shadow-blue-500">
        <div className="absolute top-10 left-10 text-center text-white">
          <img src="/logo.svg" alt="Logo" className="w-28" />
          <p className="text-sm">Where Every Beat Hits Different</p>
        </div>
        <div className="absolute top-10 right-10 text-center text-white">
          <img src="/logo.svg" alt="Logo" className="w-28" />
          <p className="text-sm">Where Every Beat Hits Different</p>
        </div>
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[95%]">
          <div className="flex justify-around text-white">
            <div className="text-center">
              <p>Already have an account?</p>
              <button onClick={() => setIsLogin(true)} className="mt-2 bg-white text-blue-800 font-bold py-1 px-4 rounded shadow-md hover:bg-yellow-500 hover:shadow-yellow-700 transition">Login</button>
            </div>
            <div className="text-center">
              <p>Don't have an account?</p>
              <button onClick={() => setIsLogin(false)} className="mt-2 bg-white text-blue-800 font-bold py-1 px-4 rounded shadow-md hover:bg-yellow-500 hover:shadow-yellow-700 transition">Sign Up</button>
            </div>
          </div>
        </div>
        <div className={`absolute transition-all duration-700 ${isLogin ? "left-6" : "left-[19.4em]"} bg-yellow-500 h-[25em] w-[18.4em] flex flex-col items-center justify-center rounded-lg shadow-lg shadow-yellow-700`}>
          {isLogin ? (
            <form className="text-center w-3/4">
              <div>
                <p className="text-xl font-semibold">Login Account</p>
              </div>
              <p className="text-sm mt-1">Login to your account</p>
              <div>
                <input type="email" placeholder="Enter your email" className="w-full p-2 mt-4 rounded shadow-md" />
              </div>
              <div>
                <input type="password" placeholder="Enter your password" className="w-full p-2 mt-2 rounded shadow-md" />
              </div>
              <a href="#" className="block text-xs mt-1 text-blue-800">Forgot Password?</a>
              <button className="mt-4 w-full bg-blue-800 text-white font-bold py-2 rounded shadow-md hover:opacity-70">Login</button>
            </form>
          ) : (
            <form className="text-center w-3/4">
              <p className="text-xl font-semibold">Sign Up Account</p>
              <p className="text-sm mt-1">Enter your details to create an account</p>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <input type="text" placeholder="First Name" className="w-full p-2 rounded shadow-md" />
                </div>
                <div className="">
                  <input type="text" placeholder="Last Name" className="w-1/2 p-2 rounded shadow-md" />
                </div>
              </div>
              <div>
                <input type="email" placeholder="Enter your email" className="w-full p-2 mt-2 rounded shadow-md" />
              </div>
              <div>
                <input type="text" placeholder="Enter your mobile number" className="w-full p-2 mt-2 rounded shadow-md" />
              </div>
              <div>
                <input type="password" placeholder="Enter your password" className="w-full p-2 mt-2 rounded shadow-md" />
              </div>
              <div>
                <button className="mt-4 w-full bg-blue-800 text-white font-bold py-2 rounded shadow-md hover:opacity-70">Sign Up</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
