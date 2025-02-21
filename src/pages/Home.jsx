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
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 overflow-x-hidden relative">
        <Header/>
        <div className="mt-20">
        <Outlet />  
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}