import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function AddCar() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const [car, setCar] = useState({
    id: "",
    name: "",
    model: "",
    year: "",
    type: "",
    price: "",
    available: false,
  });
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);
  const handleSubmit = (e) => {
    e.preventDefault();

    const nextId = Math.max(...cars.map((c) => parseInt(c.id))) + 1;
    let image = "/images/cars/default.jpg";
    if (e.currentTarget.image.files && e.currentTarget.image.files[0]) {
      image = URL.createObjectURL(e.currentTarget.image.files[0]);
    }
    const data = { ...car, id: nextId.toString(), image: image };
    axios
      .post(`${apiURL}/cars`, data)
      .then((res) => {
        dispatch({ type: "ADD_CAR", payload: data });
        navigate("/dashboard/cars");
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log(
            "API not valid or not working, ignoring error and dispatching action."
          );
          dispatch({ type: "ADD_CAR", payload: data });
          navigate("/dashboard/cars");
        } else {
          console.log(err);
        }
      });
  };
  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-600 my-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
          {isEnglish ? "Back to car list" : "العودة إلى قائمة السيارات"}
        </button>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg mb-10 p-6">
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold mb-6">
                {isEnglish ? "Add New Car" : "إضافة سيارة جديدة"}
              </h1>
              <div className="flex gap-3 items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    id="available"
                    name="available"
                    value={car.available}
                    onChange={(e) =>
                      setCar({ ...car, available: e.target.checked })
                    }
                  />
                  <div className="group peer ring-0 bg-red-600 rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-green-600 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Car Name" : "اسم السيارة"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                  value={car.name}
                  onChange={(e) => setCar({ ...car, name: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Car Model" : "طراز السيارة"}
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Car Year" : "سنة السيارة"}
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                  value={car.year}
                  onChange={(e) => setCar({ ...car, year: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Type" : "نوع"}
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                  value={car.type}
                  onChange={(e) => setCar({ ...car, type: e.target.value })}
                  required
                >
                  <option value="petrol">{isEnglish ? "Petrol" : "بنزين"}</option>
                  <option value="diesel">{isEnglish ? "Diesel" : "ديزل"}</option>
                  <option value="electric">{isEnglish ? "Electric" : "كهربائي"}</option>
                  <option value="hybrid">{isEnglish ? "Hybrid" : "هجين"}</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Car Price" : "سعر السيارة"}
                </label>
                <input
                  type="number"
                  step={0.01}
                  min={0}
                  id="price"
                  name="price"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                  value={car.price}
                  onChange={(e) => setCar({ ...car, price: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Car Image" : "صورة السيارة"}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors cursor-pointer"
              >
                {isEnglish ? "Add Car" : "إضافة سيارة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCar;
