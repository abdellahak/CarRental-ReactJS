import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import Dashboard from "./pages/admin/Dashboard";

// cars
import CarsDashboard from "./pages/admin/dashboard/cars/CarsDashboard";
import CarsList from "./pages/admin/dashboard/cars/cars list/CarsList";
import CarDetails from "./pages/admin/dashboard/cars/car details/CarDetails";
import AddCar from "./pages/admin/dashboard/cars/add car/AddCar";
import EditCar from "./pages/admin/dashboard/cars/modify car/EditCar";

// users
import UsersDashboard from "./pages/admin/dashboard/users/UsersDashboard";
import UsersList from "./pages/admin/dashboard/users/users list/UsersList";
import UserDetails from "./pages/admin/dashboard/users/user details/UserDetails";
import AddUser from "./pages/admin/dashboard/users/add user/AddUser";
import EditUser from "./pages/admin/dashboard/users/modify user/EditUser";

// contracts
import ContractsDashboard from "./pages/admin/dashboard/contracts/ContractsDashboard";
import ContractsList from "./pages/admin/dashboard/contracts/contracts list/ContractsList";
import AddContract from "./pages/admin/dashboard/contracts/add contract/AddContract";
import ContractDetails from "./pages/admin/dashboard/contracts/contract details/ContractDetails";

// home
import Home from "./pages/Home";
import GuestPage from "./pages/users/guest page/GuestPage";
import RentCar from "./pages/users/rent car page/RentCar";

// Authentification
import Login from "./pages/users/guest page/Login";
import Register from "./pages/users/guest page/Register";
import ProtectedRoute from "./components/context/ProtectedRoute";
import AdminRoute from "./components/context/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<GuestPage />} />
          <Route path="/car/:id" element={<RentCar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>}>
          <Route index element={<CarsList />} />
          {/* cars */}
          <Route path="cars" element={<CarsDashboard />}>
            <Route index element={<CarsList />} />
            <Route path=":id" element={<CarDetails />} />
            <Route path="add" element={<AddCar />} />
            <Route path="edit/:id" element={<EditCar />} />
          </Route>
          {/* users */}
          <Route path="users" element={<UsersDashboard />}>
            <Route index element={<UsersList />} />
            <Route path=":id" element={<UserDetails />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>
          <Route path="contracts" element={<ContractsDashboard />}>
            <Route index element={<ContractsList />} />
            <Route path="add" element={<AddContract />} />
            <Route path=":id" element={<ContractDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
