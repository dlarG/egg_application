import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardHome from "../components/dashboard/DashboardHome";
import UserManagement from "../components/dashboard/UserManagement";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <DashboardHome />;
      case "data":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Data Management
            </h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">
                Data management interface coming soon...
              </p>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">
                Analytics dashboard coming soon...
              </p>
            </div>
          </div>
        );
      case "users":
        return <UserManagement />;
      case "components":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Components
            </h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Component library coming soon...</p>
            </div>
          </div>
        );
      case "events":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Events</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Event management coming soon...</p>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Security</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Security settings coming soon...</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">System settings coming soon...</p>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">About</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">About information coming soon...</p>
            </div>
          </div>
        );
      case "admin-settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Admin Settings
            </h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Admin settings coming soon...</p>
            </div>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
