import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function UsersDashboard() {
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const dispatch = useDispatch(); 
  useEffect(() => {
    fetch(`${apiURL}/contracts`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: "FETCH_CONTRACTS_DATA", payload: data });
    })
  }, []);  
  return (
    <div>
      <Outlet />
    </div>
  );
}