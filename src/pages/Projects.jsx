import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // FontAwesome Icons
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch projects from API
  const fetchProjects = () => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      });
  };

  // Delete project
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await fetch(`http://localhost:5000/projects/${id}`, {
          method: "DELETE",
        });
        fetchProjects(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // Navigate to add project page
  const handleAddProject = () => {
    navigate("/addNewProject");
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedDate(null);
    setSortField("");
    setSortOrder("asc");
    setFilteredProjects(projects);
  };

  // Sorting function
  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedData = [...filteredProjects].sort((a, b) => {
      const valueA = a[field] ? a[field].toString().toLowerCase() : "";
      const valueB = b[field] ? b[field].toString().toLowerCase() : "";

      if (newSortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    setFilteredProjects(sortedData);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen text-black">
      {/* Navbar (Filters + Add Button) */}
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-md">
        <h2 className="text-xl font-bold">Projects</h2>
        <div className="flex gap-3">
          <button className="bg-gray-200 px-4 py-2 rounded-md">Filter By</button>
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              {selectedDate ? selectedDate.toDateString() : "Select Date"}
            </button>
            {isDatePickerOpen && (
              <div className="absolute bg-white p-3 shadow-lg rounded-md top-12 left-0">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setIsDatePickerOpen(false);
                  }}
                  inline
                />
                <button
                  className="bg-blue-500 text-white px-3 py-1 mt-2 rounded-md w-full"
                  onClick={() => setIsDatePickerOpen(false)}
                >
                  Apply Now
                </button>
              </div>
            )}
          </div>
          <button className="bg-gray-200 px-4 py-2 rounded-md">Status</button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleResetFilters}
          >
            Reset Filter
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddProject}
          >
            Add Project
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-5 mt-5 shadow-md rounded-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="p-2 text-left cursor-pointer"
                onClick={() => handleSort("customer")}
              >
                CUSTOMER {sortField === "customer" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="p-2 text-left cursor-pointer"
                onClick={() => handleSort("ref")}
              >
                REF NUMBER {sortField === "ref" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="p-2 text-left cursor-pointer"
                onClick={() => handleSort("projectName")}
              >
                PROJECT NAME {sortField === "projectName" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="p-2 text-left">PROJECT NUMBER</th>
              <th className="p-2 text-left">PROJECT LOCATION</th>
              <th className="p-2 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-3">
                  No projects available
                </td>
              </tr>
            ) : (
              filteredProjects.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{row.customer}</td>
                  <td className="p-2">{row.ref}</td>
                  <td className="p-2">{row.projectName}</td>
                  <td className="p-2">{row.projectNumber}</td>
                  <td className="p-2">{row.location}</td>
                  <td className="p-2 flex gap-3">
                    <FaEdit
                      className="text-blue-500 cursor-pointer"
                      size={18}
                      onClick={() => navigate(`/editProject/${row.id}`)}
                    />
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      size={18}
                      onClick={() => handleDelete(row.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
