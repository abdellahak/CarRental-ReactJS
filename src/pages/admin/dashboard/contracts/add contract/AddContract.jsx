import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, DollarSign } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@/components/context/DatePicker";

function AddContract() {
  const cars = useSelector((state) => state.cars);
  const users = useSelector((state) => state.users);
  const contracts = useSelector((state) => state.contracts);
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const [availableCars, setAvailableCars] = useState([]);
  const [contractDetails, setContractDetails] = useState({
    userId: "",
    carId: "",
    startDate: "",
    endDate: "",
    price: "",
  });
  const [selectedCarPrice, setSelectedCarPrice] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setAvailableCars(cars.filter((car) => car.available));
  }, [cars]);

  const handleCarChange = (e) => {
    const selectedCar = cars.find((car) => car.id === e.target.value);
    setContractDetails({
      ...contractDetails,
      carId: e.target.value,
      price: selectedCar ? selectedCar.price : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (
      !contractDetails.userId ||
      !contractDetails.carId ||
      !contractDetails.startDate ||
      !contractDetails.endDate ||
      !contractDetails.price
    ) {
      alert("Please fill all the fields.");
      return;
    }

    const startDate = new Date(contractDetails.startDate);
    if (startDate < currentDate) {
      alert("Start date should be greater than or equal to the current date.");
      return;
    }
    const endDate = new Date(contractDetails.endDate);
    if (endDate <= startDate) {
      alert("End date should be greater than the start date.");
      return;
    }
    const car = cars.find((car) => car.id === contractDetails.carId);
    const nextId = (
      Math.max(...contracts.map((contract) => parseInt(contract.id))) + 1
    ).toString();
    axios
      .post(`${apiURL}/contracts`, contractDetails)
      .then((res) => {
        // Update car availability
        if (startDate.getDay() == currentDate.getDay()) {
          axios
            .patch(`${apiURL}/cars/${contractDetails.carId}`, {
              available: false,
            })
            .then(() => {
              dispatch({
                type: "UPDATE_CAR",
                payload: { ...car, available: false },
              });
              navigate("/dashboard/contracts");
            })
            .catch((err) => console.log(err));
        } else {
          navigate("/dashboard/contracts");
        }
        dispatch({
          type: "ADD_CONTRACT",
          payload: { ...contractDetails, id: nextId },
        });
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log(
            "API not valid or not working, ignoring error and dispatching action."
          );
          dispatch({
            type: "ADD_CONTRACT",
            payload: { ...contractDetails, id: nextId },
          });
          navigate("/dashboard/contracts");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/dashboard/contracts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 my-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-10 p-6">
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold mb-6">Add New Contract</h1>
              <button
                onClick={() => navigate("/dashboard/users/add")}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="carId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car
                </label>
                <select
                  id="carId"
                  name="carId"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleCarChange}
                  required
                >
                  <option value="">Select a car</option>
                  {availableCars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name} -- {car.model} -- {car.year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User
                </label>
                <select
                  id="userId"
                  name="userId"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={contractDetails.userId}
                  onChange={(e) =>
                    setContractDetails({
                      ...contractDetails,
                      userId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={contractDetails.startDate}
                    onChange={(e) =>
                      setContractDetails({
                        ...contractDetails,
                        startDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={contractDetails.endDate}
                    onChange={(e) =>
                      setContractDetails({
                        ...contractDetails,
                        endDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.01}
                    min={0}
                    id="price"
                    name="price"
                    value={contractDetails.price}
                    onChange={(e) =>
                      setContractDetails({
                        ...contractDetails,
                        price: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Add Contract
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContract;
