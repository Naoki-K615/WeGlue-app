import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NomineeLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/nominee/login", {
        email,
        password,
      });

      localStorage.setItem("isNomineeLoggedIn", "true");
      localStorage.setItem("nomineeEmail", res.data.email);
      localStorage.setItem("nomineeName", res.data.name);

      navigate("/NomineeLogin/NominationForm");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center px-4 py-10 sm:px-6 lg:px-8 mt-20">
      {/* Instruction Button */}
      <div className="w-full flex justify-center mb-10">
        <button
          className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-red-500 hover:via-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 active:scale-95"
          onClick={() => navigate("/NomineeLogin/instructions")}
        >
          <span className="text-lg sm:text-xl">INSTRUCTION</span>
        </button>
      </div>

      {/* Login Card Section */}
      <div className="bg-gray-300 rounded-xl shadow-lg p-6 sm:p-10 w-full max-w-md sm:max-w-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-[#2C3E50] mb-6 relative">
          Nominate Yourself
          <span className="absolute left-0 bottom-0 w-full h-[4px] bg-gradient-to-r from-blue-600 to-cyan-400 mt-2"></span>
        </h2>

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">
            Login
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email ID</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NomineeLogin;
