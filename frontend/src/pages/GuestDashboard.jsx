import React from "react";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const GuestDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#A0D585] text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Guest Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-[#A0D585] px-4 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          <strong>Guest Access:</strong> You have limited access. Contact
          administrator for full permissions.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Production Overview
            </h3>
            <p className="text-3xl font-bold text-[#A0D585]">1,250</p>
            <p className="text-sm text-gray-600">eggs today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              System Status
            </h3>
            <p className="text-3xl font-bold text-green-500">Online</p>
            <p className="text-sm text-gray-600">all systems operational</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Available Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-[#A0D585] rounded-lg hover:bg-[#A0D585] hover:text-white transition-colors">
              View Production Data
            </button>
            <button className="p-4 border border-[#A0D585] rounded-lg hover:bg-[#A0D585] hover:text-white transition-colors">
              Basic Reports
            </button>
            <button
              className="p-4 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              disabled
            >
              Staff Operations (Restricted)
            </button>
            <button
              className="p-4 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              disabled
            >
              Admin Panel (Restricted)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
