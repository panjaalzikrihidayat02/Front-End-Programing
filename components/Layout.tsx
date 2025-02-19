import { ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar"; // Pastikan ini sesuai dengan struktur proyekmu

export default function Layout({ children }: { children: ReactNode }) {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
