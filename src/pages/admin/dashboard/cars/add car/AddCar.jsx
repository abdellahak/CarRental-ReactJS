import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function AddCar() {
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
    const data = { ...car, id: nextId.toString(), image : image};
    axios
      .post(`${apiURL}/cars`, data)
      .then((res) => {
        dispatch({ type: "ADD_CAR", payload: data });
        navigate("/dashboard/cars");
    })
    .catch((err) => {
      if (err.response && (err.response.status === 404 || err.response.status === 500)) {
        console.log("API not valid or not working, ignoring error and dispatching action.");
        dispatch({ type: "ADD_CAR", payload: data });
        navigate("/dashboard/cars");
      } else {
        console.log(err);
      }
      })
  };
  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/cars"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 my-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
          Back to car list
        </Link>
        <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-10 p-6">
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
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
                  <div className="group peer ring-0 bg-red-600  rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-green-600  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
                </label>
              </div>
            </div>

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
                  id="name"
                  name="name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={car.name}
                  onChange={(e) => setCar({ ...car, name: e.target.value })}
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
                  id="model"
                  name="model"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
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
                  id="year"
                  name="year"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={car.year}
                  onChange={(e) => setCar({ ...car, year: e.target.value })}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={car.type}
                  onChange={(e) => setCar({ ...car, type: e.target.value })}
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
                  Car Price
                </label>
                <input
                  type="number"
                  step={0.01}
                  min={0}
                  id="price"
                  name="price"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={car.price}
                  onChange={(e) => setCar({ ...car, price: e.target.value })}
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
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCar;
