import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, DollarSign } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@/components/context/DatePicker";

function AddContract() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
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
      alert(isEnglish ? "Please fill all the fields." : "يرجى ملء جميع الحقول.");
      return;
    }

    const startDate = new Date(contractDetails.startDate);
    if (startDate < currentDate) {
      alert(isEnglish ? "Start date should be greater than or equal to the current date." : "يجب أن يكون تاريخ البدء أكبر من أو يساوي التاريخ الحالي.");
      return;
    }
    const endDate = new Date(contractDetails.endDate);
    if (endDate <= startDate) {
      alert(isEnglish ? "End date should be greater than the start date." : "يجب أن يكون تاريخ الانتهاء أكبر من تاريخ البدء.");
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
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/dashboard/contracts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 my-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {isEnglish ? "Back" : "رجوع"}
        </Link>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg mb-10 p-6">
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold mb-6">{isEnglish ? "Add New Contract" : "إضافة عقد جديد"}</h1>
              <button
                onClick={() => navigate("/dashboard/users/add")}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isEnglish ? "Add User" : "إضافة مستخدم"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="carId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Car" : "سيارة"}
                </label>
                <select
                  id="carId"
                  name="carId"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  onChange={handleCarChange}
                  required
                >
                  <option value="">{isEnglish ? "Select a car" : "اختر سيارة"}</option>
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "User" : "مستخدم"}
                </label>
                <select
                  id="userId"
                  name="userId"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={contractDetails.userId}
                  onChange={(e) =>
                    setContractDetails({
                      ...contractDetails,
                      userId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">{isEnglish ? "Select a user" : "اختر مستخدم"}</option>
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Start Date" : "تاريخ البدء"}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "End Date" : "تاريخ الانتهاء"}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Price" : "السعر"}
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
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors cursor-pointer"
              >
                {isEnglish ? "Add Contract" : "إضافة عقد"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContract;
