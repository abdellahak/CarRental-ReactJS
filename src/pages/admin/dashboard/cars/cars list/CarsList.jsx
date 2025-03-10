import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Car from "./Car";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Image,
  Car as CarIcon,
  DollarSign,
  Type,
  CheckCircle,
  XCircle,
  Info,
  Pencil,
  KeyIcon
} from "lucide-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function CarsList() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // State to track view mode
  const [sortCriteria, setSortCriteria] = useState(""); // State to track sort criteria
  const carsPerPage = 8; // Number of cars per page
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars)
    .slice()
    .sort((a, b) => b.id - a.id);
  const apiURL = import.meta.env.VITE_DATA_API_URL;

  const filteredCars = cars
    .filter((car) => {
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
    })
    .sort((a, b) => {
      if (sortCriteria === "priceAsc") {
        return a.price - b.price;
      } else if (sortCriteria === "priceDesc") {
        return b.price - a.price;
      } else if (sortCriteria === "nameAsc") {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria === "nameDesc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  function deleteCar(id) {
    if (confirm(isEnglish ? "Are you sure you want to delete this car?" : "هل أنت متأكد أنك تريد حذف هذه السيارة؟")) {
      axios
        .delete(`${apiURL}/cars/${id}`)
        .then((res) => {
          dispatch({ type: "DELETE_CAR", payload: id });
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            console.log(
              isEnglish
                ? "API not valid or not working, ignoring error and dispatching action."
                : "واجهة برمجة التطبيقات غير صالحة أو لا تعمل، تجاهل الخطأ وتنفيذ الإجراء."
            );
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
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <div className="mb-4 flex justify-between flex-wrap w-full">
        <h2 className="text-2xl font-bold">{isEnglish ? "Cars :" : "السيارات :"}</h2>
        <Link
          to="/dashboard/cars/add"
          className="flex items-center text-center mt-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="w-6 h-6 mx-2"></Plus>
          {isEnglish ? "Add Car" : "إضافة سيارة"}
        </Link>
      </div>
      {/* search bar */}
      <div className="py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="relative w-fit">
          <Search className="w-5 h-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="search"
            placeholder={isEnglish ? "Search cars..." : "ابحث عن السيارات..."}
            className="pl-8 pr-4 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-0 bg-white shadow-sm dark:bg-gray-800 dark:text-white"
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
            className="border rounded-md p-2 dark:bg-gray-800 dark:text-white"
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            value={availabilityFilter}
          >
            <option value="">{isEnglish ? "All" : "الكل"}</option>
            <option value="available">{isEnglish ? "Available" : "متاح"}</option>
            <option value="unavailable">{isEnglish ? "Unavailable" : "غير متاح"}</option>
          </select>
          <select
            className="border rounded-md p-2 dark:bg-gray-800 dark:text-white"
            onChange={(e) => setTypeFilter(e.target.value)}
            value={typeFilter}
          >
            <option value="">{isEnglish ? "All Types" : "جميع الأنواع"}</option>
            <option value="petrol">{isEnglish ? "Petrol" : "بنزين"}</option>
            <option value="diesel">{isEnglish ? "Diesel" : "ديزل"}</option>
            <option value="electric">{isEnglish ? "Electric" : "كهربائي"}</option>
            {/* Add more types as needed */}
          </select>
          <input
            type="number"
            placeholder={isEnglish ? "Max Price" : "السعر الأقصى"}
            className="border rounded-md p-2 dark:bg-gray-800 dark:text-white"
            onChange={(e) => setPriceFilter(e.target.value)}
            value={priceFilter}
          />
          {/* Sort criteria */}
          <select
            className="border rounded-md p-2 dark:bg-gray-800 dark:text-white"
            onChange={(e) => setSortCriteria(e.target.value)}
            value={sortCriteria}
          >
            <option value="">{isEnglish ? "Sort By" : "ترتيب حسب"}</option>
            <option value="priceAsc">{isEnglish ? "Price: Low to High" : "السعر: من الأقل إلى الأعلى"}</option>
            <option value="priceDesc">{isEnglish ? "Price: High to Low" : "السعر: من الأعلى إلى الأقل"}</option>
            <option value="nameAsc">{isEnglish ? "Name: A to Z" : "الاسم: من الألف إلى الياء"}</option>
            <option value="nameDesc">{isEnglish ? "Name: Z to A" : "الاسم: من الياء إلى الألف"}</option>
          </select>
        </div>
        {/* View mode toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-s-md ${
              viewMode === "grid"
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-200 dark:bg-gray-700"
            } cursor-pointer`}
          >
            {isEnglish ? "Grid View" : "عرض الشبكة"}
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-e-md ${
              viewMode === "table"
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-200 dark:bg-gray-700"
            } cursor-pointer`}
          >
            {isEnglish ? "Table View" : "عرض الجدول"}
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b dark:border-gray-600">
                    <KeyIcon className="inline w-4 h-4 mx-1" />
                    {isEnglish ? "id" : "المعرف"}
                  </th>
                  <th className="py-2 px-4 border-b dark:border-gray-600">
                    <CarIcon className="inline w-4 h-4 mx-1" />
                    {isEnglish ? "Model" : "الموديل"}
                  </th>
                  <th className="py-2 px-4 border-b dark:border-gray-600">
                    <CarIcon className="inline w-4 h-4 mx-1" />
                    {isEnglish ? "Name" : "الاسم"}
                  </th>
                  <th className="py-2 px-4 border-b dark:border-gray-600">
                    <Type className="inline w-4 h-4 mx-1" />
                    {isEnglish ? "Type" : "النوع"}
                  </th>
                  <th className="py-2 px-4 border-b dark:border-gray-600">
                    <DollarSign className="inline w-4 h-4 mx-1" />
                    {isEnglish ? "Price" : "السعر"}
                  </th>
                  <th className="py-2 px-4 border-b dark:border-gray-600">
                    <CheckCircle className="inline w-4 h-4 mx-1" />
                    {isEnglish ? "Availability" : "التوفر"}
                  </th>
                  <th className="py-2 px-4 border-b dark:border-gray-600">
                    <Image className="inline w-4 h-4 mx-1" />
                    {isEnglish ? "Image" : "الصورة"}
                  </th>
                  <th className="py-2 px-4 border-b dark:border-gray-600">
                    <Edit className="inline w-4 h-4 mx-1" />
                    {isEnglish ? "Actions" : "الإجراءات"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCars.map((car, index) => (
                  <tr
                    key={car.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-700"
                        : "bg-white dark:bg-gray-800"
                    }
                  >
                    <td className="py-2 px-4 border-b dark:border-gray-600">
                      #{car.id}
                    </td>
                    <td className="py-2 px-4 border-b dark:border-gray-600">
                      {car.model}
                    </td>
                    <td className="py-2 px-4 border-b dark:border-gray-600">
                      {car.name}
                    </td>
                    <td className="py-2 px-4 border-b dark:border-gray-600">
                      {car.type}
                    </td>
                    <td className="py-2 px-4 border-b dark:border-gray-600">
                      {car.price}
                    </td>
                    <td className="py-2 px-4 border-b dark:border-gray-600">
                      {car.available ? (isEnglish ? "Available" : "متاح") : (isEnglish ? "Unavailable" : "غير متاح")}
                    </td>
                    <td className="py-2 px-4 border-b dark:border-gray-600">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="aspect-video rounded-lg h-16 object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border-b dark:border-gray-600">
                      <button
                        className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/cars/edit/${car.id}`);
                        }}
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        className="text-blue-600 mx-2 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/cars/${car.id}`);
                        }}
                      >
                        <Info className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCar(car.id);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="text-center text-3xl p-5">{isEnglish ? "No cars found" : "لم يتم العثور على سيارات"}</div>
      )}
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-1 px-3 py-1 rounded-md cursor-pointer ${
            currentPage === 1
              ? "bg-gray-300 dark:bg-gray-600"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {isEnglish ? "Back" : "السابق"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md cursor-pointer ${
              currentPage === index + 1
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mx-1 px-3 py-1 rounded-md cursor-pointer ${
            currentPage === totalPages
              ? "bg-gray-300 dark:bg-gray-600"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {isEnglish ? "Next" : "التالي"}
        </button>
      </div>
    </div>
  );
}

export default CarsList;
