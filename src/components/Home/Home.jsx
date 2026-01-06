import { Link } from "react-router-dom";
import { FaUser, FaUserFriends, FaClipboardList } from "react-icons/fa";
import { useEffect, useState } from "react";

const Home = () => {
  const [electionOn, setElectionOn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("electionStatus");
    setElectionOn(status === "on");
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-600 flex flex-col">
      {/* Content */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="bg-gray-200 p-6 sm:p-10 rounded-2xl shadow-xl text-center w-full max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 drop-shadow-xl tracking-wide mb-8 px-4 py-2 rounded-lg">
            CampusVote
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {/* Admin */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center w-full max-w-[10rem] mx-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
              <FaUser size={50} className="text-gray-800 mb-4" />
              <Link to="/admin">
                <button className="bg-green-500 text-white font-semibold text-sm px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                  Admin
                </button>
              </Link>
            </div>

            {/* Student */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center w-full max-w-[10rem] mx-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
              <FaUserFriends
                size={50}
                className="text-gray-800 mb-4 transition-all duration-300 transform hover:scale-105"
              />
              {electionOn ? (
                <Link to="/student">
                  <button className="bg-blue-600 text-white font-semibold text-sm px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    Student
                  </button>
                </Link>
              ) : (
                <button className="bg-gray-400 text-white font-semibold text-sm px-6 py-2 rounded-lg cursor-not-allowed shadow-md">
                  VotingOff
                </button>
              )}
            </div>

            {/* Nomination */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center w-full max-w-[10rem] mx-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
              <FaClipboardList
                size={50}
                className="text-gray-800 mb-4 transition-transform duration-300 transform hover:scale-110"
              />
              <Link to="/NomineeLogin">
                <button className="bg-lime-300 text-black font-semibold text-sm px-6 py-2 rounded-lg shadow-md hover:bg-lime-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Nomination
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
