import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-5">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A0D585] focus:border-[#A0D585] outline-none"
            />
          </div>
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-4">
          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <button className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Squares2X2Icon className="h-6 w-6" />
            </button>
            <button className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="cursor-pointer flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-[#A0D585] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.username}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {user?.role_type} Admin
                  </p>
                </div>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Account Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
