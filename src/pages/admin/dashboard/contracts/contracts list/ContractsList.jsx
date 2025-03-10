import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Plus,
  Search,
  Info,
  Trash2,
  User,
  Car,
  Calendar,
  CircleDollarSign,
  CircleEllipsis,
  Clock,
  ChartNoAxesColumnIncreasing,
  IdCard,
  Indent,
} from "lucide-react";
import axios from "axios";
import { IdentificationIcon } from "@heroicons/react/24/solid";

export default function ContractsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const contracts = useSelector((state) => state.contracts);
  const cars = useSelector((state) => state.cars);
  const users = useSelector((state) => state.users);
  const apiURL = import.meta.env.VITE_DATA_API_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getCarName(carId) {
    let car = cars.find((car) => car.id === carId);
    return car ? car.name : "Unknown Car";
  }

  function getUserName(userId) {
    let user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  }

  const filteredContracts = contracts.filter((contract) => {
    return (
      getUserName(contract.userId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      getCarName(contract.carId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  function deleteContract(id) {
    if (confirm("Are you sure you want to delete this contract?")) {
      axios
        .delete(`${apiURL}/contracts/${id}`)
        .then(() => {
          axios.patch(
            `${apiURL}/cars/${
              contracts.find((contract) => contract.id === id).carId
            }`,
            {
              available: true,
            }
          );
          dispatch({
            type: "RETURN_CAR",
            payload: contracts.find((contract) => contract.id === id).carId,
          });
          dispatch({ type: "DELETE_CONTRACT", payload: id });
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            console.log(
              "API not valid or not working, ignoring error and dispatching action."
            );
            dispatch({ type: "DELETE_CONTRACT", payload: id });
          } else {
            console.log(err);
          }
        });
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const contractsPerPage = 5;

  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = filteredContracts.slice(indexOfFirstContract, indexOfLastContract);

  const totalPages = Math.ceil(filteredContracts.length / contractsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <div className="mb-4 flex justify-between flex-wrap">
        <h2 className="text-2xl font-bold">Contracts:</h2>
        <Link
          to="/dashboard/contracts/add"
          className="flex items-center text-center mt-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="w-6 h-6 mr-2" />
          Add Contract
        </Link>
      </div>
      {/* search bar */}
      <div className="py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="relative w-fit">
          <Search className="w-5 h-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="search"
            placeholder="Search Contracts..."
            className="pl-8 pr-4 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-0 bg-white shadow-sm dark:bg-gray-800 dark:text-white"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
          />
        </div>
      </div>
      {/* contracts */}
      <div id="contracts" className="overflow-scroll lg:overflow-visible mt-6">
        <table className="table-auto w-full" dir="ltr">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <Indent className="h-5 w-5" />
                  </li>
                  <li>Contract Id</li>
                </ul>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <User className="h-5 w-5" />
                  </li>
                  <li>User Name</li>
                </ul>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <Car className="h-5 w-5" />
                  </li>
                  <li>Car Name (Model)</li>
                </ul>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <Calendar className="h-5 w-5" />
                  </li>
                  <li>Start Date</li>
                </ul>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <Calendar className="h-5 w-5" />
                  </li>
                  <li>End Date</li>
                </ul>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <Clock className="h-5 w-5" />
                  </li>
                  <li>Duration</li>
                </ul>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <CircleDollarSign className="h-5 w-5" />
                  </li>
                  <li>Price (per Day)</li>
                </ul>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <ChartNoAxesColumnIncreasing className="h-5 w-5" />
                  </li>
                  <li>Status</li>
                </ul>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <ul className="flex items-center space-x-2">
                  <li>
                    <CircleEllipsis className="h-5 w-5" />
                  </li>
                  <li>Actions</li>
                </ul>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {currentContracts.map((contract) => {
              let car = cars.find((car) => car.id === contract.carId);
              let user = users.find((user) => user.id === contract.userId);
              let duration = Math.floor(
                (new Date(contract.endDate) - new Date(contract.startDate)) /
                  (1000 * 60 * 60 * 24)
              );
              let rentalDays = Math.floor(
                (new Date() - new Date(contract.startDate)) /
                  (1000 * 60 * 60 * 24)
              );
              rentalDays = rentalDays > duration ? duration : rentalDays;
              return (
                <tr key={contract.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      #{contract.id}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 relative cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.children[0].classList.remove("hidden");
                      e.currentTarget.children[0].classList.add("flex");
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.children[0].classList.add("hidden");
                      e.currentTarget.children[0].classList.remove("flex");
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/users/${user.id}`);
                    }}
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex-row justify-center gap-4 p-4 absolute right-0 top-0 translate-x-full w-max hidden z-10">
                      <div className="w-fit h-full p-2 relative flex flex-col md:flex-row items-center gap-4">
                        {user ? (
                          <>
                            <img
                              src={user.image}
                              alt=""
                              className="h-16 w-16 rounded-full shadow-md object-cover"
                            />
                            <div className="text-left">
                              <div className="font-semibold text-lg">
                                {user.email}
                              </div>
                              <div className="text-gray-600 dark:text-gray-400">{user.phone}</div>
                              <div className="text-gray-600 dark:text-gray-400">
                                {user.address}
                              </div>
                            </div>
                          </>
                        ) : (
                          <span>User info unavailable</span>
                        )}
                        <div className="absolute bg-white dark:bg-gray-800 border-l-black w-3 h-3 rotate-45 top-2 -left-[22px]"></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user ? user.name : "Unknown User"}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap hover:bg-slate-200 dark:hover:bg-slate-700 relative cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.children[0].classList.remove("hidden");
                      e.currentTarget.children[0].classList.add("flex");
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.children[0].classList.add("hidden");
                      e.currentTarget.children[0].classList.remove("flex");
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/cars/${car.id}`);
                    }}
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex-row justify-center gap-4 p-4 absolute right-0 top-0 translate-x-full w-max hidden z-10">
                      <div className="w-fit h-full p-2 relative flex flex-col md:flex-row items-center gap-4">
                        {car ? (
                          <>
                            <img
                              src={car.image}
                              alt=""
                              className="h-16 aspect-video rounded-md shadow-md object-cover"
                            />
                            <div className="text-left">
                              <div className="font-semibold text-lg">
                                {car.name}
                              </div>
                              <div className="text-gray-600 dark:text-gray-400">{car.model}</div>
                              <div className="text-gray-600 dark:text-gray-400">{car.type}</div>
                            </div>
                          </>
                        ) : (
                          <span>User info unavailable</span>
                        )}
                        <div className="absolute bg-white dark:bg-gray-800 border-l-black w-3 h-3 rotate-45 top-2 -left-[22px]"></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {car ? car.name : "Unknown Car"}
                      <span className="text-gray-500 dark:text-gray-400">
                        {" "}
                        ({car ? car.model : "Unknown Model"})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {contract.startDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {contract.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                          rentalDays < 0
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : rentalDays === duration
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {rentalDays < 0 ? 0 : rentalDays}/{duration} Days
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {contract.price} DH
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          rentalDays < 0
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : rentalDays === duration
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {rentalDays < 0
                          ? "Upcoming"
                          : rentalDays === duration
                          ? "Completed"
                          : "Active"}
                      </span>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex gap-2 w-full text-center justify-center">
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/contracts/${contract.id}`);
                        }}
                      >
                        <Info className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteContract(contract.id);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-none">
              <li className="mx-1">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                  disabled={currentPage === 1}
                >
                  Back
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className="mx-1">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className="mx-1">
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
