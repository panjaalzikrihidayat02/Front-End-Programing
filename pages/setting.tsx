import { Menu, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function SettingsPage() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <div className={`pt-16 min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Navbar */}
      

      {/* Header */}
      <header className="flex flex-col items-center text-center py-12 px-6">
        <h2 className="text-4xl font-bold mb-4">Personalize Your Experience</h2>
        <p className="text-lg text-gray-500 dark:text-gray-300 max-w-2xl">
          Customize the application settings to match your preferences.
        </p>
      </header>

      {/* Settings Section */}
      <section className="max-w-2xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {/* Dark Mode */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Dark Mode</span>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${darkMode ? "bg-teal-500" : "bg-gray-300"}`}
          >
            <span className="sr-only">Enable Dark Mode</span>
            <span className={`inline-block h-4 w-4 transform bg-white rounded-full transition-all ${darkMode ? "translate-x-5" : "translate-x-0"}`} />
          </Switch>
        </div>

        {/* Notifications */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Notifications</span>
          <Switch
            checked={notifications}
            onChange={setNotifications}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${notifications ? "bg-teal-500" : "bg-gray-300"}`}
          >
            <span className="sr-only">Enable Notifications</span>
            <span className={`inline-block h-4 w-4 transform bg-white rounded-full transition-all ${notifications ? "translate-x-5" : "translate-x-0"}`} />
          </Switch>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-lg font-medium mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        {/* Save Button */}
        <button className="w-full py-2 mt-4 bg-teal-500 text-white rounded-lg font-bold hover:bg-teal-600 transition-all flex justify-center items-center space-x-2">
          <span>Save Changes</span>
          <ArrowRight />
        </button>
      </section>
    </div>
  );
}
