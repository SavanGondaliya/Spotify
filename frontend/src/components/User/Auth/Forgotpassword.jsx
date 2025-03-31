import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verifiedOtp, setVerifyOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

  const sendOtp = async () => {
    try {
      const generatedOtp = generateOTP();
      setOtp(() => generatedOtp);
      await axios.get(
        `http://localhost:5000/otp/send?receiver=${email}&otp=${generatedOtp}`
      );
      setStep(2);
      setErrorMessage(""); // Clear any previous error
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/otp/verify",
        { verifiedOtp: verifiedOtp, otp: otp },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setStep(3);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      axios.post(
        `http://localhost:5000/password/update`,
        { newpassword: newPassword, email: email },
        { headers: { "Content-Type": "application/json" } }
      ).then((res) => {
        if(res.status === 200){
          navigate("/auth/user");
        }
      })
      
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-[#282870] p-6 rounded-lg shadow-lg">
        {step === 1 && (
          <>
            <h2 className="text-white text-2xl font-semibold text-center mb-4">
              Forgot Password
            </h2>
            <p className="text-gray-400 text-sm text-center mb-6">
              Enter your registered email to receive an OTP.
            </p>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full p-3 bg-white text-black __btn_forgot__ rounded-md outline-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              disabled={!email}
              onClick={sendOtp}
              className="w-full p-3 bg-indigo-950 text-white font-semibold rounded-md __btn_forgot__"
            >
              Generate OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-white text-2xl font-semibold text-center mb-4">
              Verify OTP
            </h2>
            <p className="text-gray-400 text-sm text-center mb-6">
              Enter the OTP sent to{" "}
              <span className="text-indigo-300">{email}</span>.
            </p>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 bg-white text-black __btn_forgot__ rounded-md outline-0"
                onChange={(e) => setVerifyOtp(e.target.value)}
              />
            </div>
            <button
              onClick={() => verifyOtp()}
              className="w-full p-3 bg-indigo-800 text-white font-semibold rounded-md __btn_forgot__"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-white text-2xl font-semibold text-center mb-4">
              Set New Password
            </h2>
            <p className="text-gray-400 text-sm text-center mb-6">
              Enter your new password for{" "}
              <span className="text-indigo-300">{email}</span>.
            </p>
            <div className="mb-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 bg-white text-black __btn_forgot__ rounded-md outline-0"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 bg-white text-black __btn_forgot__ rounded-md outline-0"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>{errorMessage}</div>
            <button
              onClick={resetPassword}
              className="w-full p-3 bg-indigo-900 text-white font-semibold rounded-md __btn_forgot__"
            >
              Reset Password
            </button>
          </>
        )}

        <div className="mt-4 text-center">
          <a
            href="/auth/user"
            className="text-indigo-400 text-sm hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>

      <style>
        {`
          .__btn_forgot__ {
            box-shadow: 5px 5px 0px #4949bf;
          }
        `}
      </style>
    </div>
  );
}

/* 
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */
