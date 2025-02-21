import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("users"));
    if (storedUser) {
      setUser(storedUser);
    }

    // Apply dark mode on page load
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle Dark Mode (Tailwind way)
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // Handle language selection
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white shadow-md fixed top-0 left-64 right-0 z-10 transition-all dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center p-4">
        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon with Static Count */}
          <div className="relative cursor-pointer">
            <FaBell className="text-gray-600 text-xl dark:text-white" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              2
            </span>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-1 border rounded-lg dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={
                  selectedLanguage === "English"
                    ? "https://flagcdn.com/w40/gb.png"
                    : "https://flagcdn.com/w40/fr.png"
                }
                alt="Flag"
                className="w-5 h-5"
              />
              <span>{selectedLanguage}</span>
            </button>

            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-32 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <li
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  onClick={() => handleLanguageSelect("English")}
                >
                  <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="English Flag"
                    className="w-5 h-5"
                  />
                  English
                </li>
                <li
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  onClick={() => handleLanguageSelect("French")}
                >
                  <img
                    src="https://flagcdn.com/w40/fr.png"
                    alt="French Flag"
                    className="w-5 h-5"
                  />
                  French
                </li>
              </ul>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            className="p-2 rounded-md transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* User Profile Section */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src={user?.image || "https://i.pravatar.cc/40"}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-800 dark:text-white">
              {user?.[0]?.username || "Guest"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
