import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function EditCar() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const cars = useSelector((state) => state.cars);
  const [car, setCar] = useState({
    id: "",
    name: "",
    model: "",
    year: "",
    type: "",
    price: "",
    available: false,
  });
  const [title, setTitle] = useState("");
  useEffect(() => {
    const foundCar = cars.find((c) => c.id === id);
    if (foundCar) {
      setCar(foundCar);
      setTitle(foundCar.model);
    }
  }, [cars, id]);

  if (!car) {
    return <h2>{isEnglish ? "Car not found" : "السيارة غير موجودة"}</h2>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let image = car.image;
    if (e.currentTarget.image.files && e.currentTarget.image.files[0]) {
      image = URL.createObjectURL(e.currentTarget.image.files[0]);
    }
    let data = { ...car, image: image };
    axios
      .put(`${apiURL}/cars/${id}`, data)
      .then(() => {
        dispatch({ type: "UPDATE_CAR", payload: data });
        navigate("/dashboard/cars");
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log(
            isEnglish
              ? "API not valid or not working, ignoring error and dispatching action."
              : "API غير صالح أو لا يعمل، يتم تجاهل الخطأ وتنفيذ الإجراء."
          );
          dispatch({ type: "UPDATE_CAR", payload: data });
          navigate("/dashboard/cars");
        } else {
          console.log(err);
        }
      });
  }
  return (
    <div className="max-w-4xl mx-auto p-2 dark:bg-gray-900">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 my-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
        {isEnglish ? "Back" : "رجوع"}
      </button>
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg mb-10">
        <div className="h-96 relative">
          <img
            src={car.image}
            alt={car.model}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
            <div className="flex items-center text-white gap-2">
              <MapPin className="h-4 w-4"></MapPin>
              {isEnglish ? "Lamzar - Ait Melloul - Agadir" : "لامزار - أيت ملول - أكادير"}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold dark:text-white">
              {isEnglish ? "Modify this Car" : "تعديل هذه السيارة"}
            </h1>
            <div className="flex gap-3 items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  id="available"
                  name="available"
                  checked={car.available}
                  onChange={(e) =>
                    setCar({ ...car, available: e.target.checked })
                  }
                />
                <div className="group peer ring-0 bg-red-600 rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-green-600 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
              </label>
            </div>
          </div>
          <form action="" onSubmit={handleSubmit} className="space-y-6">
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
                  value={car.name ?? ""}
                  onChange={(e) => setCar({ ...car, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
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
                  value={car.model ?? ""}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
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
                  min={1900}
                  id="year"
                  name="year"
                  value={car.year ?? ""}
                  onChange={(e) => setCar({ ...car, year: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isEnglish ? "Type" : "النوع"}
                </label>
                <select
                  id="type"
                  name="type"
                  value={car.type ?? "petrol"}
                  onChange={(e) => setCar({ ...car, type: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
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
                  {isEnglish ? "Car Price (in DH)" : "سعر السيارة (بالدرهم)"}
                </label>
                <input
                  type="number"
                  step={0.01}
                  min={0}
                  id="price"
                  name="price"
                  value={car.price ?? ""}
                  onChange={(e) => {
                    setCar({ ...car, price: e.target.value });
                  }}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
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
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
            </div>
            {/* submit button */}
            <div className="flex justify-end pt-4 gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-white dark:bg-gray-700 text-black dark:text-white px-6 py-2 rounded-lg border border-blue-600 hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors cursor-pointer"
              >
                {isEnglish ? "Cancel" : "إلغاء"}
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                {isEnglish ? "Modify" : "تعديل"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCar;
