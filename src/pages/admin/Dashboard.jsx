import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`${apiURL}/users`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_USERS_DATA", payload: data });
      })
      .catch(() => {
        console.log("json-server is not running");
      });
  }, []);
  useEffect(() => {
    fetch(`${apiURL}/contracts`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_CONTRACTS_DATA", payload: data });
      })
      .catch(() => {
        console.log("json-server is not running");
      });
  }, []);
  useEffect(() => {
    fetch(`${apiURL}/cars`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_CARS_DATA", payload: data });
      })
      .catch(() => {
        console.log("json-server is not running");
      });
  }, []);
  useEffect(() => {
    fetch(`${apiURL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_ORDERS_DATA", payload: data });
      })
      .catch(() => {
        console.log("json-server is not running");
      });
  }, []);
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <AdminSideBar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 overflow-x-hidden">
        <AdminHeader
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <Outlet />
        <AdminFooter />
      </div>
    </div>
  );
}
