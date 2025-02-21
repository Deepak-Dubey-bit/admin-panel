import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);

  // Fetch project data from db.json
  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        console.log("data::::",data)
        setFormData(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to update project");

        alert("Project Updated Successfully!");
        navigate("/projects"); // Redirect after update
      } catch (error) {
        console.error("Error updating project:", error);
        alert("Failed to update project");
      } finally {
        setLoading(false);
      }
    }
  };

  // Reset the form
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
    <div className="p-10 bg-gray-100 min-h-screen text-black">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Edit Project</h2>

          {loading ? (
            <p className="text-center text-blue-500">Loading project details...</p>
          ) : (
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
                    <select
                      name={name}
                      className="w-full p-2 border rounded"
                      value={formData[name]}
                      onChange={handleChange}
                    >
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
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded" disabled={loading}>
                  {loading ? "Updating..." : "Update Now"}
                </button>
                <button type="button" className="border px-6 py-2 rounded" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProject;
