import React from "react";
import { FaBell, FaMoon } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";

const Header = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Notification Icon */}
      <div className="relative cursor-pointer">
        <FaBell className="text-gray-600 text-xl" />
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          2
        </span>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-2 cursor-pointer">
        <IoLanguage className="text-gray-600 text-xl" />
        <span>English</span>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium">Harley</span>
          <span className="text-sm text-gray-500">Admin</span>
        </div>
      </div>

      {/* Dark Mode Toggle (Optional) */}
      <FaMoon className="text-gray-600 text-xl cursor-pointer" />
    </div>
  );
};

export default Header;
