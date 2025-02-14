import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar isOpen={isSidebarOpen} onToggle={()=>setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 overflow-x-hidden">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}