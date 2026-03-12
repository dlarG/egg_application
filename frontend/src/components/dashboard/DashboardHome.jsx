import React from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  UsersIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";

const DashboardHome = () => {
  const stats = [
    {
      name: "Egg Sales",
      value: "72",
      change: "+12%",
      changeType: "increase",
      icon: ChartBarIcon,
      color: "text-[#A0D585]",
    },
    {
      name: "Report Sales",
      value: "$6.0k",
      change: "+8.2%",
      changeType: "increase",
      icon: CubeIcon,
      color: "text-blue-500",
    },
    {
      name: "Active Users",
      value: "248",
      change: "-2.1%",
      changeType: "decrease",
      icon: UsersIcon,
      color: "text-orange-500",
    },
  ];

  const recentApps = [
    { name: "Sales", color: "#4CAF50", code: "#4CAF50" },
    { name: "Inventory", color: "#FFD54F", code: "#FFD54F" },
    { name: "Production", color: "#FF9800", code: "#FF9800" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 grid grid-cols-1 justify-items-stretch md:grid-cols-2 gap-4 items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#5a6654]">Dashboard</h1>

          <p className="text-[#7f8f77]">
            Welcome back, here's what's happening with your egg production
            today.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="cursor-pointer flex items-center px-6 py-3 bg-[#A0D585] text-white rounded-lg hover:bg-[#90c575] transition-colors">
            <span className="mr-2">+</span>
            Download
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === "increase" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Growth Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Growth Analytics
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Recent Apps */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Apps
          </h3>
          <div className="space-y-4">
            {recentApps.map((app, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: app.color }}
                >
                  <span className="text-white font-medium text-sm">
                    {app.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{app.name}</p>
                  <p className="text-sm text-gray-500">{app.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
