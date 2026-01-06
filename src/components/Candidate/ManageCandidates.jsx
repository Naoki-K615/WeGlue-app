import { useEffect, useState } from "react";
import axios from "axios";

const ManageCandidates = () => {
  const [candidatesByPosition, setCandidatesByPosition] = useState({});

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/candidates/grouped"
      );
      setCandidatesByPosition(res.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const deleteCandidate = async (candidateId) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidates/${candidateId}`);
      fetchCandidates(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-8 mt-20">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Manage Candidates
        </h2>

        {Object.entries(candidatesByPosition).map(([position, candidates]) => (
          <div
            key={position}
            className="mb-8 p-6 border rounded-xl bg-gray-200 shadow-md"
          >
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {position}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {candidates.map((candidate) => (
                <div
                  key={candidate._id}
                  className="p-4 border rounded-xl bg-white shadow-lg text-center transition-transform transform hover:scale-105"
                >
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-full h-40 object-cover rounded-lg border shadow-md"
                  />
                  <h4 className="mt-4 text-xl font-semibold text-gray-900">
                    {candidate.name}
                  </h4>
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    onClick={() => deleteCandidate(candidate._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCandidates;
