import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];

  // Get logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Pages where sidebar & navbar should be hidden
  const hideSideBarUrls = ["register", "forgot-password", "login"];

  // Function to determine sidebar visibility
  const showSideBar = () => {
    if (hideSideBarUrls.includes(pathName)) {
      return false;
    }
    document.body.style.backgroundColor = "#f9f9f9"; 
    return true;
  };

  // Redirect user to login page if not authenticated
  if (!loggedInUser && !hideSideBarUrls.includes(pathName)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      {showSideBar() && <Sidebar />}
      <div className={showSideBar() ? "ml-64 w-full p-5" : "w-full p-5 bg-blue-500"}>
        {showSideBar() && <Navbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
