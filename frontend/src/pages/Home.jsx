import React,{useEffect} from "react";
import VerticalNavbar from "../components/Navbar/VerticalNavbar";
import HorizontalNavbar from "../components/Navbar/HorizontalNavbar";
import { Album } from "../components/Album/Album";
const Home = () => {

    const session_details = sessionStorage.getItem("session_details");

    return (
        <div>{
            session_details ? (
                <div className="flex flex-col">
                <div className="flex">
                    <div>
                        <VerticalNavbar />
                    </div>
                    <div>
                        <div>
                            <HorizontalNavbar/>
                        </div>
                        <div className="overflow-y-scroll">
                            <Album />
                        </div>
                    </div>
                </div>
                
            </div>
            ):(
                window.location.href = "/user/auth"
            )
        }
        </div>
    )
}

export default Home;