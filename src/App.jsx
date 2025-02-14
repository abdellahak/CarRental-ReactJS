import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";

// cars
import CarsDashboard from "./pages/admin/dashboard/cars/CarsDashboard";
import CarsList from "./pages/admin/dashboard/cars/cars list/CarsList";
import CarDetails from "./pages/admin/dashboard/cars/car details/CarDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}>
          <Route index element={<h1>Home</h1>} />
          <Route path="/cars" element={<h1>Cars</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<h1>Statistics</h1>} />
          <Route path="cars" element={<CarsDashboard />}>
            <Route index element={<CarsList />} />
            <Route path=":id" element={<CarDetails />} />
          </Route>
          <Route path="users" element={<h1>Users</h1>} />
          <Route path="contracts" element={<h1>Contracts</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
