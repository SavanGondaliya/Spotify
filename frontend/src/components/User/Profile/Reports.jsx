import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";

const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December"
];

const UserReports = () => {

    const [reports,setReports] = useState();
    const session_details = sessionStorage.getItem("session_details");

    const getUserReports = () => {
        try {
            axios.get(`http://localhost:5000/reports?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status===200){
                    setReports(res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getUserReports();
    },[]);
    
    return(
        <div className="px-5">
            {
                Array.isArray(reports) ? (
                    reports.map((report) => (
                        <div className="flex flex-col justify-center items-center">
                            <NavLink to={`http://localhost:5173/report/${report?.report_id}`}>

                                <div className="w-30 h-30 rounded-full flex justify-center items-center  __report_container__">
                                    <img className="w-1/2 h-1/2" src="/public/logo.svg" alt="" srcset="" />
                                </div>
                            </NavLink>
                            <h1 className="my-5">{month[parseInt(JSON.stringify(report?.report_month).slice(-2,-1))-1]} {JSON.stringify(report?.report_month).slice(1,5)}</h1>
                        </div>
                    ))
                ):(
                    <div></div>
                )
            }
            <style>
                {
                    `
                    .__report_container__{
                        background-color: #282870;
                        box-shadow: 5px 5px 0px #4949bf;
                    }
                    `
                }
            </style>
        </div>
    )
}

export default UserReports;

/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */