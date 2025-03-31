import React from "react";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import MonthlyReport from "../components/User/utility/Report";
import { useParams } from "react-router-dom";
import Wave from "../components/Animations/Wave"

const MonthlyReportPage =  () => {

    const { id } = useParams();
    return(<div className="min-h-screen w-full flex flex-col">
        {/* Navbar Section */}
        <div className=" w-full flex items-center z-20">
            <HorizontalNavbar />
        </div>
    
        {/* Main Content */}
        <div className="relative h-[90vh] w-full flex justify-center items-center z-10">
            <div className="w-full flex justify-center">
                <MonthlyReport id={id} />
            </div>
    
            {/* Wave Background */}
            <div className="absolute bottom-0 w-full h-full rotate-[340deg] scale-150 z-[-10]">
                <Wave />
            </div>
        </div>
    </div>
    
    )
}
export default MonthlyReportPage