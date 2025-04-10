import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Wave from "../../Animations/Wave";

export const AdminLogin = () => {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const login = () => {
    axios
      .post(
        `http://localhost:5000/auth/admin`,
        {
          admin: admin,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("admin_details",JSON.stringify(res.data));
          window.location.href = "/admin/dashboard";
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error?.response?.data?.message);
      });
  };

  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center outer_container bg-black px-4">
        <div className="absolute z-10">
            <Wave />
        </div>
        <div className="w-full max-w-md bg-white container z-20 p-8 rounded-lg shadow-md">
          <div className="form-log-in text-black space-y-6">
            <div className="text-center">
              <p className="text-2xl text-[#f2c178] font-bold">Login Account</p>
              <p className="text-sm text-gray-600">Login to your account</p>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold text-[#f2c178]">
                Email
              </label>
              <input
                className="w-60 p-3 rounded outline-none bg-white border border-gray-300 __input_shadows__"
                name="Email"
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setAdmin(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-semibold text-[#f2c178]">
                Password
              </label>
              <input
                className="w-60 p-3 rounded outline-none bg-white border border-gray-300 __input_shadows__"
                name="Password"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message !== "" && (
              <p className="text-center text-lg text-red-500">{message}</p>
            )}

            <button
              className="w-60 space-y-2 py-3 text-white bg-[#f2c178] __register_btn__ rounded font-bold transition hover:bg-[#e6b56a]"
              onClick={() => login()}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
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
                        width: 30em;
                        height: 30em;
                        border-radius: 5px;
                        box-shadow: 10px 10px 0px 1px #4949bf;
                    }
                    .form-log-in{
                        display : flex;
                        justify-content : center;
                        align-items : center;
                        flex-direction : column
                    }
                    .__input_shadows__{
                        box-shadow : 5px 5px 0px #f2c178;
                    }
                    .__register_btn__{
                        box-shadow : 5px 5px 0px #935d07;
                    }
                    `}
      </style>
    </React.Fragment>
  );
};
/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */
