import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 🟢 Register CategoryScale and other required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const data = {
    labels: ["5k", "10k", "15k", "20k", "25k", "30k"],
    datasets: [
      {
        label: "Sales",
        data: [20, 40, 35, 80, 50, 70],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-5 mt-5 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Sales Details</h2>
      <Line data={data} />
    </div>
  );
};

export default SalesChart;
