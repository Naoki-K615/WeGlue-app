import React, { useEffect, useState } from "react";
import axios from "axios";

const InstructionPage = () => {
  const [pdfLink, setPdfLink] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/getPDF")
      .then((res) => {
        setPdfLink(res.data.filePath);
      })
      .catch((err) => {
        console.error("Error fetching PDF:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#595F6E] flex items-center justify-center px-4 py-8">
      <div className="bg-[#D9D9D9] rounded-lg shadow-lg p-5 sm:p-6 md:p-8 w-full max-w-3xl overflow-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-[#2C3E50] mb-6 relative">
          INSTRUCTION
          <span className="absolute left-0 bottom-0 w-full h-[4px] bg-gradient-to-r from-blue-600 to-cyan-400 mt-2"></span>
        </h2>

        <div className="text-sm sm:text-base mb-6 space-y-3">
          <p className="font-extrabold">Dear Candidate,</p>
          <p>
            We hope you're doing well and are all set for the upcoming college
            elections. Please download and carefully read the attached
            instructions, which include important details about the election
            process, campaign guidelines, and key dates.
          </p>
          <p>
            If you have any questions, feel free to reach out to the election
            committee. Wishing you all the best for your campaign!
          </p>
          <p>
            Warm regards, <br />
            <span className="italic">admin@iiitmanipur.ac.in</span>
          </p>
        </div>

        <div className="flex justify-center sm:justify-end mt-4">
          {pdfLink ? (
            <a
              href={`http://localhost:5000${pdfLink}`}
              download
              className="bg-white text-black px-5 py-2 border-2 border-black rounded-md hover:bg-gray-200 text-sm sm:text-base"
            >
              Instruction PDF
            </a>
          ) : (
            <p className="text-center text-sm text-gray-700">Loading PDF...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
