import { Menu, Download, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ReportsPage() {
  const { darkMode } = useTheme();
  const [reportType, setReportType] = useState("Monthly");

  const data = [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 180 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 200 },
    { name: "May", value: 170 },
    { name: "Jun", value: 250 },
  ];

  return (
    <div className={`pt-16 min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>

      {/* Header */}
      <header className="flex flex-col items-center text-center py-12 px-6">
        <h2 className="text-4xl font-bold mb-4">Data & Analytics</h2>
        <p className="text-lg text-gray-500 dark:text-gray-300 max-w-2xl">
          Get insights from your data with detailed reports and analysis.
        </p>
      </header>

      {/* Report Type Selector */}
      <div className="max-w-2xl mx-auto p-6">
        <label className="block text-lg font-medium mb-2">Select Report Type</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Chart Section */}
      <section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#333"} />
            <YAxis stroke={darkMode ? "#fff" : "#333"} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000" }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Report Actions */}
      <div className="max-w-2xl mx-auto p-6 flex justify-between">
        <button className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-semibold rounded-lg flex items-center space-x-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all">
          <FileText />
          <span>View Full Report</span>
        </button>
        <button className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg flex items-center space-x-2 hover:bg-teal-700 transition-all">
          <Download />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}
