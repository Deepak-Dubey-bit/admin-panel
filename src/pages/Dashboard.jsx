import React from "react";
import { FaUsers, FaBox, FaDollarSign, FaClock } from "react-icons/fa";
import SalesChart from "../components/SalesChart"; 
import Table from "../components/Table"; 

const Dashboard = () => {
  const cards = [
    { title: "Total User", value: "40,689", icon: <FaUsers />, change: "8.5% Up from yesterday", color: "bg-purple-500" },
    { title: "Total Order", value: "10,293", icon: <FaBox />, change: "1.3% Up from past week", color: "bg-yellow-500" },
    { title: "Total Sales", value: "$89,000", icon: <FaDollarSign />, change: "4.3% Down from yesterday", color: "bg-green-500" },
    { title: "Total Pending", value: "2,040", icon: <FaClock />, change: "1.8% Up from yesterday", color: "bg-orange-500" },
  ];

  return (
    <div className="p-5">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-4 gap-5 mt-10">
        {cards.map((card, index) => (
          <div key={index} className="p-5 bg-white shadow-md rounded-md flex items-center gap-5">
            <div className={`p-3 ${card.color} text-white text-xl rounded-md`}>{card.icon}</div>
            <div>
              <h3 className="text-sm">{card.title}</h3>
              <h2 className="text-xl font-bold">{card.value}</h2>
              <p className="text-xs text-gray-500">{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-5 shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-3">Sales Overview</h2>
        <SalesChart /> 
      </div>

     
      <div className="mt-10 bg-white p-5 shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-3">Deals Details</h2>
        <Table /> 
      </div>
    </div>
  );
};

export default Dashboard;
