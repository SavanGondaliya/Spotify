import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {

  const verifyStatus = localStorage.getItem("verified");
  const userDetails = sessionStorage.getItem("user_details");
  const [message, setMessage] = useState("We have sent you an email.");
  const [verified, setVerified] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sendMail = () => {

    axios.get(`http://localhost:5000/mail/register?userDetails=${userDetails}`,{
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    if(verifyStatus == true){
      navigate("/")
    }
  })

  useEffect(() => {
    sendMail();
  },[]);

  useEffect(() => {
    const token = searchParams.get("verifyDetails");

    if (token) {
      fetch(`http://localhost:5000/mail/verify?verifyEmail=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMessage("You are verified, now you can use our features.");
            setVerified(true);
          } else {
            setMessage("Verification failed. Invalid or expired token.");
          }
        })
        .catch(() => setMessage("An error occurred."));
    }
  }, [searchParams]); 

    const closeAndRedirect = () => {
    window.location.href = "/auth/user";
  };
  
  useEffect(() => {
    const handleStorageEvent = (event) => {
      if (event.key === "closeVerificationTab") {
        window.close(); 
      }
    };
  
    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg">{message}</p>
      {verified && (
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={closeAndRedirect}>
            Click Here To Go To Login
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
