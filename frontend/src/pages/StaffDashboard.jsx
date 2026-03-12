import React from "react";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
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
          <h1 className="text-2xl font-bold">Staff Dashboard</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Today's Production
            </h3>
            <p className="text-3xl font-bold text-[#A0D585]">1,250</p>
            <p className="text-sm text-gray-600">eggs collected</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Active Tasks
            </h3>
            <p className="text-3xl font-bold text-orange-500">7</p>
            <p className="text-sm text-gray-600">pending</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Alerts</h3>
            <p className="text-3xl font-bold text-red-500">2</p>
            <p className="text-sm text-gray-600">requires attention</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Staff Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 border border-[#A0D585] rounded-lg hover:bg-[#A0D585] hover:text-white transition-colors">
              Record Production
            </button>
            <button className="p-4 border border-[#A0D585] rounded-lg hover:bg-[#A0D585] hover:text-white transition-colors">
              Inventory Management
            </button>
            <button className="p-4 border border-[#A0D585] rounded-lg hover:bg-[#A0D585] hover:text-white transition-colors">
              Quality Control
            </button>
            <button className="p-4 border border-[#A0D585] rounded-lg hover:bg-[#A0D585] hover:text-white transition-colors">
              Daily Reports
            </button>
            <button className="p-4 border border-[#A0D585] rounded-lg hover:bg-[#A0D585] hover:text-white transition-colors">
              Maintenance Log
            </button>
            <button className="p-4 border border-[#A0D585] rounded-lg hover:bg-[#A0D585] hover:text-white transition-colors">
              Schedule Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
