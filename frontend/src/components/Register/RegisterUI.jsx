import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "./style.css";
import axios from "axios";

const RegisterUI = () => {

  return (
    <div className="outer_container">
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
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
          <button onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;
