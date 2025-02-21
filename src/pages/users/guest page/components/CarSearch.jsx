import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CarSearch() {
  const cars = useSelector((state) => state.cars);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [carsModels, setCarsModels] = useState([]);
  const [carsBrands, setCarsBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const brands = cars.map((car) => car.name);
    setCarsBrands([...new Set(brands)]);
  }, [cars]);

  useEffect(() => {
    if (selectedBrand.trim() !== "") {
      const models = cars
        .filter(
          (car) => car.name.toLowerCase() === selectedBrand.toLocaleLowerCase()
        )
        .map((car) => car.model);
      setCarsModels([...new Set(models)]);
    } else {
      setCarsModels([]);
    }
  }, [selectedBrand]);

  function handleSearch() {
    console.log(cars);
    console.log(selectedBrand);
    console.log(selectedModel);
    const car = cars.find(
      (car) =>
        car.name.toLowerCase() === selectedBrand.toLowerCase() &&
        car.model.toLowerCase() === selectedModel.toLowerCase()
    );

    if (car) {
      navigate(`/car/${car.id}`);
    } else {
      alert("Car not found");
    }
  }

  return (
    <>
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Search Your Best Cars
            </h2>
            <p className="text-gray-400">
              Find your perfect ride with our extensive collection of premium
              vehicles
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="w-full md:w-64 relative">
              <select
                className="w-full px-4 py-3 rounded-md bg-white appearance-none cursor-pointer pr-10"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Select Brand</option>
                {carsBrands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none h-5 w-5" />
            </div>

            <div className="w-full md:w-64 relative">
              <select
                className="w-full px-4 py-3 rounded-md bg-white appearance-none cursor-pointer pr-10"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="">Select Model</option>
                {carsModels.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none h-5 w-5" />
            </div>

            <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800 cursor-pointer transition duration-300" onClick={handleSearch}>
              SEARCH NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
