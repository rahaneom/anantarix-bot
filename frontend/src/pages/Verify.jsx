import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";
import ParticlesBackground from "../styles/ParticlesBackground";
import '../styles/authStyle.css';
import '../index.css'

const Verify = () => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnLoading } = UserData();

  const {fetchChats} = ChatData()

  const navigate = useNavigate();

  const submitHandler = (e) => {
    console.log(otp);
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="gradient-bg"></div>
      <ParticlesBackground />
      
      <form
        className="p-6 rounded shadow-md w-full md:w-[500px] login-form"
        onSubmit={submitHandler}
      >
        <h2 className="mb-8 text-[1.8rem] text-center">Verify</h2>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="otp">
            OTP:
          </label>
          <input
            type="number"
            min={0}
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 input-box"
            required
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
          <p className="text-gray-400 text-[0.85rem] m-2">Valid upto 5 minutes</p>
        </div>

        <button className="text-white submit-btn ">
          {btnLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Verify;
