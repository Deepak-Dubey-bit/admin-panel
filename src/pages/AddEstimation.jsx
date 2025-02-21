import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
const AddEstimation = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      title: "Sample Section",
      margin: 0,
      items: [{ id: Date.now(), name: "", description: "", unit: "", quantity: 0, price: 0, margin: 0, total: 0 }]
    }
  ]);

  // Add a new section
  const addSection = () => {
    setSections([...sections, {
      id: Date.now(),
      title: "Sample Section",
      margin: 0,
      items: [{ id: Date.now(), name: "", description: "", unit: "", quantity: 0, price: 0, margin: 0, total: 0 }]
    }]);
  };

  // Add item to a section
  const addItem = (sectionId) => {
    setSections(sections.map(section => section.id === sectionId ? {
      ...section,
      items: [...section.items, { id: Date.now(), name: "", description: "", unit: "", quantity: 0, price: 0, margin: 0, total: 0 }]
    } : section));
  };

  // Remove an item
  const removeItem = (sectionId, itemId) => {
    setSections(sections.map(section => section.id === sectionId ? {
      ...section,
      items: section.items.filter(item => item.id !== itemId)
    } : section));
  };

  // Remove a section
  const removeSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  // Update input fields
  const updateItem = (sectionId, itemId, field, value) => {
    setSections(sections.map(section =>
      section.id === sectionId ? {
        ...section,
        items: section.items.map(item =>
          item.id === itemId ? { ...item, [field]: value, total: item.quantity * item.price + item.margin } : item
        )
      } : section
    ));
  };

  // Calculate totals
  const subTotal = sections.reduce((sum, sec) => sum + sec.items.reduce((s, i) => s + i.total, 0), 0);
  const totalMargin = sections.reduce((sum, sec) => sum + sec.items.reduce((s, i) => s + i.margin, 0), 0);
  const totalAmount = subTotal + totalMargin;

  // Save estimation
  const saveEstimation = async () => {
    try {
      const newEstimate = {
        version: "00012",
        project: "New Project",
        client: "Client Name",
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        status: "Created",
        sections
      };

      await axios.post("http://localhost:5000/estimates", newEstimate);
      navigate("/estimations");
    } catch (error) {
      console.error("Error saving estimation:", error);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Estimates</h2>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.id} className="border p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={section.title}
                onChange={(e) => setSections(sections.map(sec => sec.id === section.id ? { ...sec, title: e.target.value } : sec))}
                className="border p-2 w-3/4"
              />
              <button onClick={() => removeSection(section.id)} className="text-red-500">❌</button>
            </div>

            {/* Items Table */}
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Item Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Unit</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price ($)</th>
                  <th className="border p-2">Margin</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">
                      <input type="text" className="border p-1 w-full" value={item.name} onChange={(e) => updateItem(section.id, item.id, "name", e.target.value)} />
                    </td>
                    <td className="border p-2">
                      <input type="text" className="border p-1 w-full" value={item.description} onChange={(e) => updateItem(section.id, item.id, "description", e.target.value)} />
                    </td>
                    <td className="border p-2">
                      <input type="text" className="border p-1 w-full" value={item.unit} onChange={(e) => updateItem(section.id, item.id, "unit", e.target.value)} />
                    </td>
                    <td className="border p-2">
                      <input type="number" className="border p-1 w-full" value={item.quantity} onChange={(e) => updateItem(section.id, item.id, "quantity", parseFloat(e.target.value))} />
                    </td>
                    <td className="border p-2">
                      <input type="number" className="border p-1 w-full" value={item.price} onChange={(e) => updateItem(section.id, item.id, "price", parseFloat(e.target.value))} />
                    </td>
                    <td className="border p-2">
                      <input type="number" className="border p-1 w-full" value={item.margin} onChange={(e) => updateItem(section.id, item.id, "margin", parseFloat(e.target.value))} />
                    </td>
                    <td className="border p-2">${item.total.toFixed(2)}</td>
                    <td className="border p-2">
                      <button onClick={() => removeItem(section.id, item.id)} className="text-red-500">❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={() => addItem(section.id)} className="text-blue-500 mt-2">➕ Add Item</button>
          </div>
        ))}

        <button onClick={addSection} className="bg-green-500 text-white px-4 py-2 rounded">Add Section</button>

        {/* Total Calculation */}
        <div className="mt-4">
          <p>Sub Total: ${subTotal.toFixed(2)}</p>
          <p>Total Margin: ${totalMargin.toFixed(2)}</p>
          <p className="font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
        </div>

        {/* Submit & Cancel */}
        <div className="mt-4">
          <button onClick={() => navigate("/estimations")} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button onClick={saveEstimation} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddEstimation;
