import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Home, User, Settings, BarChart, Bell, Menu, Moon, Sun } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", revenue: 4000, users: 2400 },
  { name: "Feb", revenue: 3000, users: 1398 },
  { name: "Mar", revenue: 5000, users: 3800 },
  { name: "Apr", revenue: 4000, users: 2800 },
];

export default function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`pt-16 flex min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <aside className={`transition-all ${sidebarOpen ? "w-64" : "w-20"} ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-4`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold text-center transition-all ${sidebarOpen ? "block" : "hidden"}`}>Dashboard</h2>
          <Menu className="cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <ul className="space-y-4">
          {["Dashboard", "Profile", "Reports", "Settings"].map((menu) => (
            <li
              key={menu}
              className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all ${
                activeMenu === menu ? "bg-teal-500 text-white" : darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveMenu(menu)}
            >
              {menu === "Dashboard" && <Home />}
              {menu === "Profile" && <User />}
              {menu === "Reports" && <BarChart />}
              {menu === "Settings" && <Settings />}
              <span className={sidebarOpen ? "block" : "hidden"}>{menu}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className={`flex justify-between items-center ${darkMode ? "bg-gray-800" : "bg-white"} p-4 shadow-md rounded-lg mb-6`}>
          <h1 className="text-xl font-semibold">{activeMenu}</h1>
          <div className="flex items-center space-x-4">
            <Bell className="cursor-pointer" />
            
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

       {/* Content */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
  <Card className="bg-white dark:bg-gray-800 text-black dark:text-white transition-all shadow-md rounded-lg">
    <CardContent className="p-4">
      <h2 className="text-lg font-bold">Total Users</h2>
      <p className="text-3xl font-semibold">1,200</p>
    </CardContent>
  </Card>
  <Card className="bg-white dark:bg-gray-800 text-black dark:text-white transition-all shadow-md rounded-lg">
    <CardContent className="p-4">
      <h2 className="text-lg font-bold">Revenue</h2>
      <p className="text-3xl font-semibold">$45,000</p>
    </CardContent>
  </Card>
  <Card className="bg-white dark:bg-gray-800 text-black dark:text-white transition-all shadow-md rounded-lg">
    <CardContent className="p-4">
      <h2 className="text-lg font-bold">Active Sessions</h2>
      <p className="text-3xl font-semibold">320</p>
    </CardContent>
  </Card>
</section>

<section className="p-5">
<Card className="bg-white dark:bg-gray-800 text-black dark:text-white transition-all shadow-md rounded-lg">
  <CardContent className="p-4">
    <h2 className="text-lg font-bold">Conversion Rate</h2>
    <p className="text-3xl font-semibold">72.5%</p>
    <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full mt-2">
      <div className="bg-teal-500 h-2 rounded-full" style={{ width: "72.5%" }}></div>
    </div>
  </CardContent>
</Card>
</section>

<section className="p5">
<Card className="bg-white dark:bg-gray-800 text-black dark:text-white transition-all shadow-md rounded-lg">
  <CardContent className="p-4">
    <h2 className="text-lg font-bold">Upcoming Events</h2><Card className="bg-white dark:bg-gray-800 text-black dark:text-white transition-all shadow-md rounded-lg">
  <CardContent className="p-4">
    <h2 className="text-lg font-bold">Recent Activities</h2>
    <ul className="mt-2 space-y-2">
      <li className="text-sm">✅ John Doe just signed in</li>
      <li className="text-sm">📊 Sales report updated</li>
      <li className="text-sm">⚠️ System maintenance scheduled</li>
    </ul>
  </CardContent>
</Card>

    <ul className="mt-2 space-y-2">
      <li className="flex justify-between">
        <span>Team Meeting</span>
        <span className="text-gray-500 dark:text-gray-400">Feb 25</span>
      </li>
      <li className="flex justify-between">
        <span>Product Launch</span>
        <span className="text-gray-500 dark:text-gray-400">Mar 10</span>
      </li>
    </ul>
  </CardContent>
</Card>
</section>




        {/* Chart Section */}
        <section className={`mt-6 p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-lg font-bold mb-4">Revenue & Users Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#ffffff50" : "#ccc"} />
              <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
              <YAxis stroke={darkMode ? "#fff" : "#000"} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000" }} />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
}
