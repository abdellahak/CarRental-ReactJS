import React, { useState } from "react";
import { Link } from "react-router-dom";
import Car from "./Car";
import { Plus, Search, Edit, Trash2, Image, Car as CarIcon, DollarSign, Type, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function CarsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // State to track view mode
  const carsPerPage = 8; // Number of cars per page
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);
  const apiURL = import.meta.env.VITE_DATA_API_URL;

  const filteredCars = cars.filter((car) => {
    const matchesSearchQuery =
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability = availabilityFilter
      ? car.available === (availabilityFilter === "available")
      : true;
    const matchesType = typeFilter ? car.type === typeFilter : true;
    const matchesPrice = priceFilter
      ? car.price <= parseFloat(priceFilter)
      : true;

    return (
      matchesSearchQuery && matchesAvailability && matchesType && matchesPrice
    );
  });

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  function deleteCar(id) {
    if (confirm("Are you sure you want to delete this car?")) {
      axios
        .delete(`${apiURL}/cars/${id}`)
        .then((res) => {
          dispatch({ type: "DELETE_CAR", payload: id });
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            console.log("API not valid or not working, ignoring error and dispatching action.");
            dispatch({ type: "DELETE_USER", payload: id });
          } else {
            console.log(err);
          }
        });
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = filteredCars.slice(startIndex, startIndex + carsPerPage);

  return (
    <div className="p-4">
      <div className=" mb-4 flex justify-between flex-wrap w-full">
        <h2 className="text-2xl font-bold">Cars : </h2>
        <Link
          to="/dashboard/cars/add"
          className="flex items-center text-center mt-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6 mr-2"></Plus>
          Add Car
        </Link>
      </div>
      {/* search bar */}
      <div className="py-4 border-b border-gray-300">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search cars..."
            className=" pl-8 pr-4 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-0 bg-white shadow-sm"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            value={searchQuery}
          />
        </div>
      </div>
        <div className="flex justify-between items-center mt-4">
      {/* filters */}
      <div className="flex space-x-4 py-4">
        <select
          className="border rounded-md p-2"
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          value={availabilityFilter}
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <select
          className="border rounded-md p-2"
          onChange={(e) => setTypeFilter(e.target.value)}
          value={typeFilter}
        >
          <option value="">All Types</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          {/* Add more types as needed */}
        </select>
        <input
          type="number"
          placeholder="Max Price"
          className="border rounded-md p-2"
          onChange={(e) => setPriceFilter(e.target.value)}
          value={priceFilter}
        />
      </div>
      {/* View mode toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewMode("grid")}
          className={`px-4 py-2 rounded-l-md ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"} cursor-pointer`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={`px-4 py-2 rounded-r-md ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-gray-200"} cursor-pointer`}
        >
          Table View
        </button>
      </div>

      </div>
      {currentCars.length > 0 ? (
        viewMode === "grid" ? (
          <div
            id="products"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
          >
            {currentCars.map((car) => (
              <Car key={car.id} car={car} deleteCar={deleteCar}></Car>
            ))}
          </div>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2"><CarIcon className="inline w-4 h-4 mr-1" />Model</th>
                <th className="py-2"><CarIcon className="inline w-4 h-4 mr-1" />Name</th>
                <th className="py-2"><Type className="inline w-4 h-4 mr-1" />Type</th>
                <th className="py-2"><DollarSign className="inline w-4 h-4 mr-1" />Price</th>
                <th className="py-2"><CheckCircle className="inline w-4 h-4 mr-1" />Availability</th>
                <th className="py-2"><Image className="inline w-4 h-4 mr-1" />Image</th>
                <th className="py-2"><Edit className="inline w-4 h-4 mr-1" />Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCars.map((car) => (
                <tr key={car.id}>
                  <td className="py-2">{car.model}</td>
                  <td className="py-2">{car.name}</td>
                  <td className="py-2">{car.type}</td>
                  <td className="py-2">{car.price}</td>
                  <td className="py-2">{car.available ? "Available" : "Unavailable"}</td>
                  <td className="py-2"><img src={car.image} alt={car.name} className="w-16 h-16 object-cover" /></td>
                  <td className="py-2">
                    <Link
                      to={`/dashboard/cars/edit/${car.id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCar(car.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <div className="text-center text-3xl p-5">No cars found</div>
      )}
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md cursor-pointer ${
              currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CarsList;
