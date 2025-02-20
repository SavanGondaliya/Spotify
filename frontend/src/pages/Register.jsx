import { useEffect,useState } from "react";
import Register from "../components/Register/Register";


const Auth = () => {

    const [player,setPlayer] = useState(null);
    const [deviceId,setDeviceId] = useState(null);


    return (
        <div>
            <Register />
        </div>
    )
}

export default Auth;