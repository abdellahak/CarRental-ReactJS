import React from "react";
import { Link } from "react-router-dom";
import Car from "./Car";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function CarsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);
  const apiURL = import.meta.env.VITE_DATA_API_URL;

  
  const filteredCars = cars.filter((car) => {
    return (
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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

  return (
    <div className="p-4">
      <div className=" mb-4 flex justify-between flex-wrap">
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
            }}
            value={searchQuery}
          />
        </div>
      </div>
      {filteredCars.length > 0 ? (
        <div
          id="products"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
        >
          {filteredCars.map((car) => (
            <Car key={car.id} car={car} deleteCar={deleteCar}></Car>
          ))}
        </div>
      ) : (
        <div className="text-center text-3xl p-5">No cars found</div>
      )}
    </div>
  );
}

export default CarsList;
