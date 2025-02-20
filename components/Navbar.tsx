import { useState, useEffect } from "react";
import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  const menuItems = ["Home", "Produk", "Profile", "Setting", "Report", "user"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredResults(
        menuItems.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-grey-500/80 dark:bg-grey-500/80 backdrop-blur-md shadow-md"
          : "bg-teal-500 dark:bg-grey-500"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1
  className={`text-xl font-bold transition-all ${
    isScrolled ? "text-gray-500" : "text-white"
  } dark:${isScrolled ? "text-gray-300" : "text-gray-200"}`}
>
  SIKING
</h1>

        
        {/* Menu */}
        <div className="hidden md:flex space-x-6 flex-grow justify-center">
  {menuItems.map((item, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={`/${item.toLowerCase()}`}
        className={`font-bold transition-all ${
          isScrolled ? "text-gray-500" : "text-white"
        } dark:${isScrolled ? "text-gray-300" : "text-gray-200"} hover:text-gray-300 dark:hover:text-gray-400`}
      >
        {item}
      </Link>
    </motion.div>
  ))}
</div>


        {/* Search Bar + Mode Toggle */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <motion.div
              whileFocus={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-3 py-1"
            >
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 outline-none bg-transparent text-black dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            {/* Search Results Dropdown */}
            {filteredResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
              >
                {filteredResults.map((item, index) => (
                  <Link
                    key={index}
                    href={`/${item.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    {item}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          {/* Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg dark:"
          >
            {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800" />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
