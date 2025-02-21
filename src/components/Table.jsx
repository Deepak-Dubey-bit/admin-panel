import React from "react";
const Table = () => {
    return (
      <div className="bg-white p-5 mt-5 shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-3">Table</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Product Name</th>
              <th>Location</th>
              <th>Date - Time</th>
              <th>Piece</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-2">Product 1</td>
              <td>New York</td>
              <td>12-02-2024</td>
              <td>2</td>
              <td>$200</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  