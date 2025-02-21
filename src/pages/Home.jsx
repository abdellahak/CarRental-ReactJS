import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import AdminFooter from "../components/admin/AdminFooter";
export default function Home() {
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