import React from "react";
import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "home", name: "Home", icon: HomeIcon },
    { id: "data", name: "Data", icon: ChartBarIcon },
    { id: "analytics", name: "Analytics", icon: DocumentChartBarIcon },
    { id: "components", name: "Components", icon: Cog6ToothIcon },
    { id: "events", name: "Events", icon: CalendarDaysIcon },
    { id: "users", name: "User Management", icon: UserGroupIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
    { id: "settings", name: "Settings", icon: Cog6ToothIcon },
  ];

  const bottomMenuItems = [
    { id: "about", name: "About", icon: InformationCircleIcon },
    { id: "admin-settings", name: "Admin Settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img src="/Logo/3.png" alt="" className="w-10 h-10 rounded-xl" />
          <span className="text-lg font-bold text-[#5a6654]">
            Egg Management
          </span>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`cursor-pointer w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-2 text-[15px] ${
                    activeSection === item.id
                      ? "bg-[#A0D585] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="px-3 py-4 border-t border-gray-200">
        <ul className="space-y-1">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-[#A0D585] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
