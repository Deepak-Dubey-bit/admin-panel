import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaProjectDiagram, FaFileInvoice, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);

  // Logout Function
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear(); // Clear local storage
      window.location.href="/login"; // Redirect to login page
    }
  };

  return (
    <div className="w-64 bg-blue-700 h-screen p-5 text-white fixed flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold">LOGO</h1>
        <ul className="mt-10">
          <li
            className={`flex items-center gap-3 p-3 rounded-md ${
              active === "/" ? "bg-blue-800" : "hover:bg-blue-600"
            } cursor-pointer`}
          >
            <Link to="/" onClick={() => setActive("/")}>
              <div className="flex items-center gap-3">
                <FaTachometerAlt /> Dashboard
              </div>
            </Link>
          </li>
          <li
            className={`flex items-center gap-3 p-3 mt-3 rounded-md ${
              active === "/projects" ? "bg-blue-800" : "hover:bg-blue-600"
            } cursor-pointer`}
          >
            <Link to="/projects" onClick={() => setActive("/projects")}>
              <div className="flex items-center gap-3">
                <FaProjectDiagram /> Projects
              </div>
            </Link>
          </li>
          <li
            className={`flex items-center gap-3 p-3 mt-3 rounded-md ${
              active === "/estimations" ? "bg-blue-800" : "hover:bg-blue-600"
            } cursor-pointer`}
          >
            <Link to="/estimations" onClick={() => setActive("/estimations")}>
              <div className="flex items-center gap-3">
                <FaFileInvoice /> Estimates
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button (Same Styling as Other Menu Items) */}
      <div
        className={`flex items-center gap-3 p-3 mt-3 rounded-md cursor-pointer ${
          active === "/logout" ? "bg-blue-800" : "hover:bg-blue-600"
        }`}
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
