import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function OrdersDashboard
() {
  return (
    <div>
      <Outlet />
    </div>
  );
}