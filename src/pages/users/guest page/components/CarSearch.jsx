import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CarSearch() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
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
    const car = cars.find(
      (car) =>
        car.name.toLowerCase() === selectedBrand.toLowerCase() &&
        car.model.toLowerCase() === selectedModel.toLowerCase()
    );

    if (car) {
      navigate(`/car/${car.id}`);
    } else {
      alert(isEnglish ? "Car not found" : "السيارة غير موجودة");
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 pt-20 pb-10" id="search-car">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
              {isEnglish ? "Search Your Best Cars" : "ابحث عن أفضل السيارات"}
            </h2>
            <p className="text-gray-900 dark:text-gray-400">
              {isEnglish
                ? "Find your perfect ride with our extensive collection of premium vehicles"
                : "اعثر على رحلتك المثالية مع مجموعتنا الواسعة من المركبات الفاخرة"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="w-full md:w-64 relative">
              <select
                className="w-full px-4 py-3 rounded-md bg-gray-200 dark:bg-gray-800 appearance-none cursor-pointer pr-10 text-black dark:text-white"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">
                  {isEnglish ? "Select Brand" : "اختر العلامة التجارية"}
                </option>
                {carsBrands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand.toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500 pointer-events-none h-5 w-5" />
            </div>

            <div className="w-full md:w-64 relative">
              <select
                className="w-full px-4 py-3 rounded-md bg-gray-200 dark:bg-gray-800 appearance-none cursor-pointer pr-10 text-black dark:text-white"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="">
                  {isEnglish ? "Select Model" : "اختر الطراز"}
                </option>
                {carsModels.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500 pointer-events-none h-5 w-5" />
            </div>

            <button
              className="w-full md:w-auto px-8 py-3 bg-brand-600 dark:bg-brand-600 text-white dark:text-white rounded-md hover:bg-brand-800 dark:hover:bg-brand-800 cursor-pointer transition duration-300"
              onClick={handleSearch}
            >
              {isEnglish ? "SEARCH NOW" : "ابحث الآن"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
