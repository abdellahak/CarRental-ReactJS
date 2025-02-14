import React from "react";
import { Car, User, FileText, BarChart2, Menu, Paperclip } from "lucide-react";
import { Link, useLocation} from "react-router-dom";

function AdminSideBar({ isOpen, onToggle }) {

  const location = useLocation();

  function isActive(path) {
    return location.pathname.startsWith(path);
  }
  return (
    <aside
      className={`${
        isOpen ? "lg:w-64 py-4" : "w-20 px-2"
      } p-4 bg-[#1a2234] text-gray-300 transition-all duration-300 ease-in-out relative`}
    >
      <button
        onClick={onToggle}
        className="absolute top-6 -right-12 bg-[#1a2234] p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50 border border-gray-700 cursor-pointer"
      >
        <Menu size={24} />
      </button>

      <div className="my-3">
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
              to="/cars"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive("/dashboard/cars") ? "bg-blue-600 text-white" : "hover:bg-gray-700/50"
              } ${!isOpen && "justify-center"}`}
              title={!isOpen ? "Cars" : undefined}
            >
              <Car className="w-5 h-5" />
              {isOpen && "Cars"}
            </Link>
          </li>
          <li>
            <Link
              to="/clients"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive("/dashboard/clients") ? "bg-blue-600 text-white" : "hover:bg-gray-700/50"
              } ${!isOpen && "justify-center"}`}
              title={!isOpen ? "Clients" : undefined}
            >
              <User className="w-5 h-5" />
              {isOpen && "Clients"}
            </Link>
          </li>
          <li>
            <Link
              to="/contracts"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive("/dashboard/contracts") ? "bg-blue-600 text-white" : "hover:bg-gray-700/50"
              } ${!isOpen && "justify-center"}`}
              title={!isOpen ? "Contracts" : undefined}
            >
              <FileText className="w-5 h-5" />
              {isOpen && "Contracts"}
            </Link>
          </li>
          
        </ul>
      </nav>
    </aside>
  );
}
export default AdminSideBar;
