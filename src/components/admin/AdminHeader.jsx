import React from "react";
import { Car, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageToggle from "../context/LanguageToggle";
import DarkModeToggle from "../context/DarkModeToggle";

function AdminHeader({ isOpen, onToggle }) {
  return (
    <header className="bg-[#1a2234] bg-[url('/images/admin/header.jpg')] bg-center text-white h-60 overflow-hidden w-full relative">
      <div className="absolute top-0 left-0 w-full h-full z-10 p-4 flex justify-start items-start gap-4">
        <button
          onClick={onToggle}
          className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <Menu size={24} />
        </button>
        <LanguageToggle />
        <DarkModeToggle />
      </div>
      <div className="h-full w-full backdrop-blur-sm p-4 flex items-end">
        <Car className="h-20 w-20" />
        <Link to="/" className="text-5xl font-bold p-2 text-blue">
          Mingo Cars
        </Link>
      </div>
    </header>
  );
}

export default AdminHeader;
