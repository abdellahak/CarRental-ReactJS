import React from "react";
import { Car, User, FileText, BarChart2, Menu, Paperclip } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function AdminSideBar({ isOpen, onToggle }) {
  const location = useLocation();

  function isActive(path) {
    return location.pathname.startsWith(path);
  }
  return (
    <aside
      className={`${
        isOpen ? "lg:w-64" : "w-14 md:w-20 px-2"
      } bg-[#1a2234] text-gray-300 transition-all duration-300 ease-in-out relative`}
    >
      <div className={`py-4 sticky top-0 z-50 ${isOpen ? "px-2  py-4":""}`}>
        <button
          onClick={onToggle}
          className="absolute top-6 -right-14 bg-[#1a2234] p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50 border border-gray-700 cursor-pointer"
        >
          <Menu size={24} />
        </button>
        <div className="my-10">
          <h2
            className={`text-xl font-bold text-white flex items-center gap-2 ${
              !isOpen && "justify-center"
            } text-nowrap`}
          >
            <Car className="h-6 w-6" />
            {isOpen && "Mingo Cars"}
          </h2>
        </div>

        <nav className="mt-10">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/cars"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive("/dashboard/cars")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700/50"
                } ${!isOpen && "justify-center"}`}
                title={!isOpen ? "Cars" : undefined}
              >
                <Car className="w-5 h-5" />
                {isOpen && "Cars"}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/users"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive("/dashboard/users")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700/50"
                } ${!isOpen && "justify-center"}`}
                title={!isOpen ? "Users" : undefined}
              >
                <User className="w-5 h-5" />
                {isOpen && "Users"}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/contracts"
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  isActive("/dashboard/contracts")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700/50"
                } ${!isOpen && "justify-center"}`}
                title={!isOpen ? "Contracts" : undefined}
              >
                <FileText className="w-5 h-5" />
                {isOpen && "Contracts"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
export default AdminSideBar;
