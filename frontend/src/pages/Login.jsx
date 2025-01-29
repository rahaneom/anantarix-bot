import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import ParticlesBackground from "../styles/ParticlesBackground";
import '../styles/authStyle.css';

const Login = () => {
  const [email, setEmail] = useState("");

  const { loginUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
    // console.log(email);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="gradient-bg"></div>
      <ParticlesBackground />
      
      <form
        className=" p-8 rounded shadow-md w-full md:w-[500px] login-form"
        onSubmit={submitHandler}
        
      >
        <h2 className="mb-8 text-[1.8rem] text-center ">Login</h2>

        <div className="mb-4">
          <label className="block mb-2 " htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded outline-none input-box"
            placeholder="abc@gmail.com"
            required
          />
        </div>

        <button
          className="px-2 py-2 text-white submit-btn"
          disabled={btnLoading}
        >
          {btnLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
