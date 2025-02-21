import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", username: "", password: "", terms: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.terms) {
      setError("You must accept terms and conditions.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === formData.email)) {
      setError("User already exists!");
      return;
    }

    users.push({ email: formData.email, username: formData.username, password: formData.password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registration successful! You can now login.");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
            <label className="ml-2 text-sm text-gray-700">Accept Terms & Conditions</label>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
