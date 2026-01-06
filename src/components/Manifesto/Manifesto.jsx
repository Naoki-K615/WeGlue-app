import React from "react";
import { useNavigate } from "react-router-dom";

const candidates = [
  {
    id: 1,
    name: "Yash Verma",
    position: "President",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Ananya Gupta",
    position: "Cultural Secretary",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Aman Kumar",
    position: "Sports Head",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Neha Sharma",
    position: "Technical Secretary",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Rohit Singh",
    position: "Treasurer",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Sneha Roy",
    position: "Vice President",
    image: "https://via.placeholder.com/150",
  },
];

const Manifesto = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/manifesto/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-700">
      {/* Header */}
      <div className="w-full bg-white py-2 shadow-sm flex items-center justify-between px-4 border-b">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/8/80/IIIT_Manipur_logo.png"
          alt="IIIT Logo"
          className="h-10"
        />
        <h1 className="text-sm font-semibold text-center flex-grow -ml-10">
          Indian Institute of Information Technology, Manipur
        </h1>
      </div>

      {/* Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-gray-200 rounded-2xl p-4 flex flex-col items-center shadow-lg"
          >
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-32 h-32 rounded-xl object-cover mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {candidate.name}
            </h2>
            <p className="text-sm font-medium text-gray-700 mb-4">
              {candidate.position}
            </p>
            <button
              onClick={() => handleClick(candidate.id)}
              className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-green-600 transition"
            >
              Manifesto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manifesto;
