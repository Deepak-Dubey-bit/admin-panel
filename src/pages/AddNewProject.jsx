import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for Navigation
import React from "react";
const AddNewProject = () => {
  const [formData, setFormData] = useState({
    customer: "",
    referenceNumber: "",
    projectName: "",
    projectNumber: "",
    areaLocation: "",
    address: "",
    dueDate: "",
    contact: "",
    manager: "",
    staff: "",
    status: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state for API call
  const navigate = useNavigate(); // Navigation hook

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validation function
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add project");
      }

      alert("Project Added Successfully!");
      navigate("/projects"); // Navigate to Projects List Page

    } catch (error) {
      console.error("Error adding project:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to reset the form
  const handleCancel = () => {
    setFormData({
      customer: "",
      referenceNumber: "",
      projectName: "",
      projectNumber: "",
      areaLocation: "",
      address: "",
      dueDate: "",
      contact: "",
      manager: "",
      staff: "",
      status: "",
      email: "",
    });
    setErrors({});
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen text-black flex justify-center items-center">
      <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          {/* Form Fields */}
          {[
            { label: "Customer", name: "customer", type: "select", options: ["Customer A", "Customer B"] },
            { label: "Reference Number", name: "referenceNumber", type: "text" },
            { label: "Project Name", name: "projectName", type: "text" },
            { label: "Project Number", name: "projectNumber", type: "text" },
            { label: "Area Location", name: "areaLocation", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Due Date", name: "dueDate", type: "date" },
            { label: "Contact", name: "contact", type: "text" },
            { label: "Manager", name: "manager", type: "select", options: ["Manager A", "Manager B"] },
            { label: "Staff", name: "staff", type: "select", options: ["Staff A", "Staff B"] },
            { label: "Status", name: "status", type: "select", options: ["Pending", "Ongoing", "Completed"] },
            { label: "Email", name: "email", type: "email" },
          ].map(({ label, name, type, options }) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              {type === "select" ? (
                <select name={name} className="w-full p-2 border rounded" value={formData[name]} onChange={handleChange}>
                  <option value="">Select {label.toLowerCase()}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  className="w-full p-2 border rounded"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={formData[name]}
                  onChange={handleChange}
                />
              )}
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          {/* Buttons */}
          <div className="col-span-3 flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded flex items-center"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Now"}
            </button>
            <button type="button" className="border px-6 py-2 rounded" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProject;
