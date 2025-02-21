import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import AdminFooter from "../components/admin/AdminFooter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
export default function Home() {
  const dispatch = useDispatch();
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  useEffect(() => {
    axios.get(`${apiURL}/cars`)
    .then((res) => {
      dispatch({ type: "FETCH_CARS_DATA", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
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