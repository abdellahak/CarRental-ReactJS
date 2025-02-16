import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function EditCar() {
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
    return <h2>Car not found</h2>;
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
            "API not valid or not working, ignoring error and dispatching action."
          );
          dispatch({ type: "UPDATE_CAR", payload: data });
          navigate("/dashboard/cars");
        } else {
          console.log(err);
        }
      });
  }
  return (
    <div className="max-w-4xl mx-auto p-2">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 my-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
        Back
      </button>
      <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-10">
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
              Lamzar - Ait Melloul - Agadir
            </div>
          </div>
        </div>
        <div className=" p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Modify this Car</h1>
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
                <div className="group peer ring-0 bg-red-600  rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-green-600  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
              </label>
            </div>
          </div>
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Name
                </label>
                <input
                  type="text"
                  ip="name"
                  name="name"
                  value={car.name ?? ""}
                  onChange={(e) => setCar({ ...car, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Model
                </label>
                <input
                  type="text"
                  ip="model"
                  name="model"
                  value={car.model ?? ""}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Year
                </label>
                <input
                  type="number"
                  min={1900}
                  ip="year"
                  name="year"
                  value={car.year ?? ""}
                  onChange={(e) => setCar({ ...car, year: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={car.type ?? "petrol"}
                  onChange={(e) => setCar({ ...car, type: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Price (en DH)
                </label>
                <input
                  type="number"
                  step={0.01}
                  min={0}
                  ip="price"
                  name="price"
                  value={car.price ?? ""}
                  onChange={(e) => {
                    setCar({ ...car, price: e.target.value });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* submit button */}
            <div className="flex justify-end pt-4 gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-white text-black px-6 py-2 rounded-lg border border-blue-600 hover:bg-blue-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Modify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCar;
