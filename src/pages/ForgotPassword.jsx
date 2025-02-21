import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email verification, Step 2: Reset Password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // ✅ Step 1: Verify Email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.email === email);

    if (!userExists) {
      setError("Email not found!");
      return;
    }

    setError("");
    setStep(2); // Move to Reset Password step
  };

  // ✅ Step 2: Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((user) => {
      if (user.email === email) {
        return { ...user, password: newPassword };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(users));
    setSuccess("Password reset successfully!");
    setError("");

    setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {step === 1 ? (
          // ✅ Step 1: Email Verification Form
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Enter your Email:</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Verify Email
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Remembered your password?{" "}
              <Link to="/login" className="text-blue-500 font-medium">Login</Link>
            </p>
          </form>
        ) : (
          // ✅ Step 2: Password Reset Form
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">New Password:</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Confirm Password:</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
