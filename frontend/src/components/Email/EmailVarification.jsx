import {React} from "react";


const EmailVerification = () => {


    return (
        <div className="w-dvw h-dvh bg-black">
            <div className="w-full h-full flex flex-col justify-evenly items-center">
                <div className="mt-5">
                    <img className="w-50 h-50" src="/logo.svg" alt="" />
                </div>
                <div className="flex flex-col bg-indigo-700 p-10 rounded text-center">
                    <div>
                        <h1 className="text-2xl text-white" >Please Check Your Email!!</h1>
                        <h1 className="text-2xl text-white" >We Have Send You An Email To Verify</h1>
                    </div>
                </div>
            </div>  
        </div>
    )

}

export default EmailVerification;