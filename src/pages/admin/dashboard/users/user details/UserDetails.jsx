import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { EllipsisVertical, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function UserDetails() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const users = useSelector((state) => state.users);
  const cars = useSelector((state) => state.cars);
  const contracts = useSelector((state) =>
    state.contracts.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    )
  );
  const [bookedCars, setBookedCars] = useState([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const bookedCarsContracts = contracts
      .filter((c) => c.userId == id)
      .map((c) => c.carId);
    setBookedCars(cars.filter((c) => bookedCarsContracts.includes(c.id)));
  }, [contracts, cars, users, id]);
  useEffect(() => {
    const foundUser = users.find((u) => u.id === id);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [users, id]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto dark:bg-gray-900 dark:text-white">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 my-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
        {isEnglish ? "Back" : "رجوع"}
      </button>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
        <div className="md:flex relative">
          <div className="md:flex-shrink-0">
            <img
              className="h-60 w-full object-cover md:w-48 md:h-48"
              src={user.image || "/images/users/defaultUser.jpg"}
              alt={isEnglish ? "User image" : "صورة المستخدم"}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-300 font-semibold">
              {user.email}
            </div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">
              {user.name}
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{user.phone}</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{user.address}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className="flex items-center justify-center w-10 h-10 hover:text-gray-800 dark:hover:text-gray-200 transition-colors absolute right-3 top-3 cursor-pointer"
          >
            <EllipsisVertical className="w-6 h-6"></EllipsisVertical>
          </button>
          <div ref={dropdownRef}>
            <div
              data-dropdown-content
              className={`${
                isDropdownOpen ? "block" : "hidden"
              } bg-white dark:bg-gray-700 w-32 py-2 absolute z-10 rounded-lg shadow-md top-12 right-1`}
            >
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white"
                to={`/dashboard/users/edit/${user.id}`}
              >
                {isEnglish ? "Edit" : "تعديل"}
              </Link>
              <a
                href="#"
                className="block px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-600"
              >
                {isEnglish ? "Delete" : "حذف"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto md:max-w-2xl m-5">
        <h2 className="text-2xl my-3">{isEnglish ? "Booked Cars history :" : "تاريخ السيارات المحجوزة :"}</h2>
        {bookedCars.length > 0 ? (
          bookedCars.map((car, index) => (
            <div
              className="overflow-hidden border-t border-t-gray-300 dark:border-t-gray-600 cursor-pointer my-5 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => navigate(`/dashboard/cars/${car.id}`)}
              key={index}
            >
              <div className="md:flex relative">
                <div className="md:flex-shrink-0">
                  <img
                    className="aspect-video h-full object-cover md:w-48"
                    src={car.image}
                    alt={isEnglish ? "Car image" : "صورة السيارة"}
                  />
                </div>
                <div className="p-4 w-full">
                  <div className="flex justify-between w-full">
                    <div>
                      <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-300 font-semibold">
                        {car.model}
                      </div>
                      <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">
                        {car.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{car.year}</p>
                      <p className="text-gray-500 dark:text-gray-400">{car.type}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-gray-500 dark:text-gray-400">
                    {contracts.map((c) =>
                      c.carId === car.id && c.userId === user.id
                        ? `${c.startDate} - ${c.endDate}`
                        : null
                    )}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {contracts.map((c) =>
                      c.carId === car.id && c.userId === user.id ? (
                        <span
                          key={c.id}
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            new Date(c.endDate) < new Date()
                              ? "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                              : new Date(c.startDate) > new Date()
                              ? "bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-200"
                              : "bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-200"
                          }`}
                        >
                          {isEnglish ? "Status: " : "الحالة: "}
                          {new Date(c.endDate) < new Date()
                            ? isEnglish ? "Completed" : "مكتمل"
                            : new Date(c.startDate) > new Date()
                            ? isEnglish ? "Upcoming" : "قادم"
                            : isEnglish ? "Active" : "نشط"}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>{isEnglish ? "No cars booked" : "لا توجد سيارات محجوزة"}</p>
        )}
      </div>
    </div>
  );
}
