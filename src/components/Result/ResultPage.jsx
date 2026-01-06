import { useEffect, useState } from "react";
import axios from "axios";

const ResultPage = () => {
  const [electionResults, setElectionResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/candidates/grouped"
        );
        console.log("Election Results:", res.data); // <-- Add this
        setElectionResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-8 mt-20">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Election Results
        </h2>

        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-600">
            Loading results...
          </p>
        ) : (
          Object.entries(electionResults).map(([position, candidates]) => (
            <div
              key={position}
              className="mb-8 p-6 border rounded-xl bg-gray-200 shadow-md"
            >
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {position}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {candidates.map((candidate, index) => (
                  <div
                    key={index}
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
                    <p className="mt-2 text-lg font-medium text-gray-700">
                      Votes: {candidate.votes ?? 0}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResultPage;
