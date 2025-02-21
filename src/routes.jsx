import React from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Projects from "./pages/Projects";
import Estimations from "./pages/Estimations";
import AddNewProject from "./pages/AddNewProject";
import EditProject from "./pages/EditProject";
import EditEstimation from "./pages/EditEstimation";
import AddEstimation from "./pages/AddEstimation";
import ProtectedRoute from "./ProtectedRoute"; // ✅ Import ProtectedRoute

const routes = [
  // Public Routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },

  // Protected Routes (Only accessible after login)
  { path: "/", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: "/projects", element: <ProtectedRoute><Projects /></ProtectedRoute> },
  { path: "/addNewProject", element: <ProtectedRoute><AddNewProject /></ProtectedRoute> },
  { path: "/editProject/:id", element: <ProtectedRoute><EditProject /></ProtectedRoute> },
  { path: "/estimations", element: <ProtectedRoute><Estimations /></ProtectedRoute> },
  { path: "/addEstimation", element: <ProtectedRoute><AddEstimation /></ProtectedRoute> },
  { path: "/editEstimation/:id", element: <ProtectedRoute><EditEstimation /></ProtectedRoute> },
];

export default routes;
