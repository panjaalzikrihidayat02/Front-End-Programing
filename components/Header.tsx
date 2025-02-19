import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null; // Hindari hydration error

  return (
    <header className={`p-4 transition-all shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-teal-500 text-black"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Siking</h1>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-500 transition-all font-bold">Home</Link>
          <Link href="/dashboard" className="hover:text-blue-500 transition-all font-bold">Dashboard</Link>
          <Link href="/profile" className="hover:text-blue-500 transition-all font-bold">Profile</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800" />}
          </button>
          <Menu className="md:hidden cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
