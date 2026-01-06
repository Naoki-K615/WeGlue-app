import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ElectionPage = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState({});
  const [electionData, setElectionData] = useState({});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isStudentLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/", { replace: true });
    }

    const fetchCandidates = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/candidates/grouped");
        const data = await res.json();
        setElectionData(data);
      } catch (error) {
        console.error("Failed to fetch candidates", error);
      }
    };

    fetchCandidates();
  }, [navigate]);

  const handleVote = async (position, candidateId, candidateName) => {
    if (votes[position]) {
      alert("You have already voted for this position!");
      return;
    }

    const studentEmail = localStorage.getItem("studentEmail");

    try {
      const res = await fetch("http://localhost:5000/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId, studentEmail, position }),
      });

      const data = await res.json();

      if (res.ok) {
        setVotes({ ...votes, [position]: candidateName });
        alert(`You voted for ${candidateName} as ${position}`);
      } else {
        alert(data.error || "Voting failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error voting");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentName");
    navigate("/", { replace: true });
    setTimeout(() => {
      navigate(0);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-8 mt-20">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Election Candidates
        </h2>
        {Object.entries(electionData).map(([position, candidates]) => (
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
                    onClick={() =>
                      handleVote(position, candidate._id, candidate.name)
                    }
                    disabled={votes[position] !== undefined}
                    className={`mt-4 px-6 py-2 w-full rounded-lg transition-colors ${
                      votes[position]
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {votes[position] === candidate.name
                      ? "Voted"
                      : votes[position]
                      ? "can't vote"
                      : "Vote"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full max-w-xs transition-colors block mx-auto"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ElectionPage;
