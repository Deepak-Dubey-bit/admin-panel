import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Estimations = () => {
  const [estimates, setEstimates] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // Fetch Estimates from Mock API
  const fetchEstimates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/estimates");
      setEstimates(response.data);
    } catch (error) {
      console.error("Error fetching estimates:", error);
    }
  };

  useEffect(() => {
    fetchEstimates();
  }, []);

  // Delete Estimate
  const deleteEstimate = async (id) => {
    await axios.delete(`http://localhost:5000/estimates/${id}`);
    fetchEstimates();
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Estimates</h2>
          <button 
            onClick={() => navigate("/addEstimation")}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Estimate
          </button>
        </div>

        {/* Filter */}
        <input
          type="text"
          placeholder="Search by project..."
          className="w-full p-2 border rounded mb-4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Version</th>
              <th className="border p-2">Project</th>
              <th className="border p-2">Client</th>
              <th className="border p-2">Created Date</th>
              <th className="border p-2">Last Modified</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {estimates
              .filter((est) => est?.project?.toLowerCase()?.includes(filter?.toLowerCase()))
              ?.map((est) => (
                <tr key={est.id} className="border">
                  <td className="border p-2">{est.version}</td>
                  <td className="border p-2">{est.project}</td>
                  <td className="border p-2">{est.client}</td>
                  <td className="border p-2">{est.createdDate}</td>
                  <td className="border p-2">{est.lastModified}</td>
                  <td className="border p-2">{est.status}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/editEstimation/${est.id}`)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteEstimate(est.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estimations;
