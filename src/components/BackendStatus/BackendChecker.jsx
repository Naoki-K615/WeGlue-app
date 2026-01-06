import { useState, useEffect } from "react";
import axios from "axios";

function BackendChecker({ children }) {
  const [backendStatus, setBackendStatus] = useState("checking");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get(`${BACKEND_URL}/api/health`, { timeout: 5000 });
        setBackendStatus("online");
      } catch (error) {
        setBackendStatus("offline");
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  if (backendStatus === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Connecting to server...</p>
        </div>
      </div>
    );
  }

  if (backendStatus === "offline") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Backend Not Available</h1>
          <p className="text-gray-700 mb-6">
            Your backend server doesn't work or is not running.
          </p>
          <div className="bg-gray-100 p-4 rounded text-left text-sm">
            <p className="font-semibold mb-2">To fix this:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              <li>Make sure backend server is running</li>
              <li>Check if it's running on {BACKEND_URL}</li>
              <li>Verify your .env configuration</li>
            </ol>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return children;
}

export default BackendChecker;
