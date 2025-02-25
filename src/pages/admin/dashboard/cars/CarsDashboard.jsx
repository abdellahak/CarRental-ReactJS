import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function CarsDashboard() {
  // const apiURL = import.meta.env.VITE_DATA_API_URL;
  // const dispatch = useDispatch(); 
  // useEffect(() => {
  //   fetch(`${apiURL}/cars`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatch({ type: "FETCH_CARS_DATA", payload: data });
  //     })
  //     .catch(() => {
  //       console.log("json-server is not running");
  //     });
  // }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}