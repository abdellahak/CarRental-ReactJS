import React from "react";
import { Car, User, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminSideBar({ isOpen, onToggle }) {
  const location = useLocation();
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";

  function isActive(path) {
    return location.pathname.startsWith(path);
  }

  return (
    <aside
      className={`${
        isOpen ? "lg:w-64" : "w-14 md:w-20 px-2"
      } bg-white dark:bg-[#1a2234] text-gray-900 dark:text-gray-300 transition-all duration-300 ease-in-out relative border-r border-gray-200 dark:border-gray-800`}
    >
      <div className={`py-4 sticky top-0 z-50 ${isOpen ? "px-2 py-4" : ""}`}>
        <div className="my-10">
          <Link
            to="/"
            className={`text-xl font-bold flex items-center gap-2 ${
              !isOpen && "justify-center"
            } text-nowrap`}
            dir={language === "ar" ? "rtl" : ""}
          >
            <img
              alt={isEnglish ? "Mingo Cars" : "مينجو كارز"}
              src="/images/logo/mingo cars logo.png"
              className="h-12 w-auto invert dark:invert-0"
            />
            {isOpen && (
              <span className="text-gray-900 dark:text-white">
                Mingo Cars
              </span>
            )}
          </Link>
        </div>

        <nav className="mt-10" >
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/cars"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive("/dashboard/cars")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700/50"
                } ${!isOpen && "justify-center"}`}
                title={!isOpen ? (isEnglish ? "Cars" : "السيارات") : undefined}
                dir={language === "ar" ? "rtl" : ""}
              >
                <Car className="w-5 h-5" />
                {isOpen && (isEnglish ? "Cars" : "السيارات")}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/users"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive("/dashboard/users")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700/50"
                } ${!isOpen && "justify-center"}`}
                title={!isOpen ? (isEnglish ? "Users" : "المستخدمين") : undefined}
                dir={language === "ar" ? "rtl" : ""}
              >
                <User className="w-5 h-5" />
                {isOpen && (isEnglish ? "Users" : "المستخدمين")}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/contracts"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive("/dashboard/contracts")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700/50"
                } ${!isOpen && "justify-center"}`}
                title={!isOpen ? (isEnglish ? "Contracts" : "العقود") : undefined}
                dir={language === "ar" ? "rtl" : ""}
              >
                <FileText className="w-5 h-5" />
                {isOpen && (isEnglish ? "Contracts" : "العقود")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default AdminSideBar;
