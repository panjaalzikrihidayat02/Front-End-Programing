import { Menu, Moon, Sun, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function HomePage() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`pt-16 min-h-screen transition-all bg-gray-100 dark:bg-gray-900 text-black dark:text-white`}>
      {/* Navbar */}
      

      {/* Hero Section */}
      <header className="flex flex-col items-center text-center py-20 px-6">
        <h2 className="text-5xl font-bold mb-4">Welcome to Siking</h2>
        <p className="text-lg text-gray-500 dark:text-gray-300 max-w-2xl">
          Explore a new way of managing your projects and workflow with ease and efficiency.
        </p>
        <button className="mt-6 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg flex items-center space-x-2 hover:bg-teal-700 transition-all">
          <span>Get Started</span>
          <ArrowRight />
        </button>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
        {[
          { title: "Fast & Responsive", desc: "Optimized for speed and adaptability." },
          { title: "Secure & Reliable", desc: "Top-notch security for your data." },
          { title: "Modern UI/UX", desc: "Elegant design with smooth interactions." }
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg shadow-md transition-all bg-white dark:bg-gray-800"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
