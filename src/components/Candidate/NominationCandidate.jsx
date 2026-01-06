import React, { useEffect, useState } from "react";
import axios from "axios";

const NominationCandidate = () => {
  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/nominee/all");
        setNominees(res.data);
      } catch (err) {
        console.error("Failed to fetch nominees", err);
      }
    };

    fetchNominees();
  }, []);

  const BASE_URL = "http://localhost:5000";

  const downloadFile = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = `${BASE_URL}/download?file=${encodeURIComponent(filePath)}`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nominee?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/nomination/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setNominees(nominees.filter((n) => n._id !== id));
      } else {
        alert(data.message || "Failed to delete nominee");
      }
    } catch (error) {
      console.error("Error deleting nominee:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-8 pt-24">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-6xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Nomination List
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nominees.map((nominee) => (
            <div
              key={nominee._id}
              className="p-4 border rounded-xl bg-gray-100 shadow-lg text-black transition-transform transform hover:scale-105 flex flex-col justify-between"
            >
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={`${BASE_URL}${nominee.image}`}
                  alt="Candidate"
                  className="object-cover h-full w-full rounded"
                />
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold">
                  <strong>Name:</strong> {nominee.name}
                </p>
                <p>
                  <strong>Roll Number:</strong> {nominee.rollNumber}
                </p>
                <p>
                  <strong>Passing Year:</strong> {nominee.passoutYear}
                </p>
                <p>
                  <strong>Position:</strong> {nominee.position}
                </p>
                <p>
                  <strong>Manifesto:</strong>{" "}
                  <button
                    onClick={() =>
                      downloadFile(nominee.manifesto, "Manifesto.pdf")
                    }
                    className="text-blue-600 underline"
                  >
                    Download
                  </button>
                </p>
                <p>
                  <strong>Image:</strong>{" "}
                  <button
                    onClick={() =>
                      downloadFile(nominee.image, "CandidateImage.jpg")
                    }
                    className="text-blue-600 underline"
                  >
                    Download
                  </button>
                </p>
              </div>
              <button
                onClick={() => handleDelete(nominee._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NominationCandidate;
