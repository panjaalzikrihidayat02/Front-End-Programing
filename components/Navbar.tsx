import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Jika scroll lebih dari 50px, ubah state
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-teal-500/80 dark:bg-teal-700/80 backdrop-blur-md shadow-md"
          : "bg-teal-500 dark:bg-teal-700"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-white">SIKINGgg</h1>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-200 transition-all font-bold">
            Home
          </Link>
          <Link href="/dashboard" className="text-white hover:text-gray-200 transition-all font-bold">
            Dashboard
          </Link>
          <Link href="/profile" className="text-white hover:text-gray-200 transition-all font-bold">
            Profile
          </Link>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-white/30 dark:bg-gray-700"
        >
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800" />}
        </button>
      </div>
    </nav>
  );
}
