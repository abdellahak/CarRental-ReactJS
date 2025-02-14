import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function CarsDashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:2001/cars")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_CARS_DATA", payload: data });
      })
      .catch(() => {
        console.log("json-server is not running");
      });
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}