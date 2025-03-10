import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import AdminFooter from "../components/admin/AdminFooter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
export default function Home() {
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const dispatch = useDispatch();
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
    fetch(`${apiURL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_ORDERS_DATA", payload: data });
      });
  }, []);
  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      <div className="flex-1 overflow-x-hidden relative">
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>
        <div className="mt-[65px]">
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}
