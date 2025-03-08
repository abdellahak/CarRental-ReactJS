import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CarsHero from "./components/CarsHero";
import CarsPageList from "./components/CarsPageList";
import FiltersSettings from "./components/FiltersSettings";
import PaginationControls from "./components/PaginationControls";

export default function CarsPage() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const cars = useSelector((state) => state.cars);
  const maxPrice = Math.max(...cars.map((car) => car.price));
  const minPrice = Math.min(...cars.map((car) => car.price));

  const [makeFilter, setMakeFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 1000]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCars, setCurrentCars] = useState([]);
  const itemsPerPage = 9;

  const uniqueMakes = [...new Set(cars.map((car) => car.name))];
  const uniqueModels = [...new Set(cars.map((car) => car.model))];
  const uniqueYears = [
    ...new Set(cars.map((car) => car.year.toString().trim())),
  ].sort((a, b) => a - b);

  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      return (
        (makeFilter === "" || car.name === makeFilter) &&
        (modelFilter === "" || car.model === modelFilter) &&
        (yearFilter === "" || car.year.toString() === yearFilter) &&
        car.price >= priceRangeFilter[0] &&
        car.price <= priceRangeFilter[1]
      );
    });
    setFilteredCars(filtered);
  }, [cars, makeFilter, modelFilter, yearFilter, priceRangeFilter]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentCars(filteredCars.slice(startIndex, startIndex + itemsPerPage));
  }, [filteredCars, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [makeFilter, modelFilter, yearFilter, priceRangeFilter]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = () => {
    setMakeFilter("");
    setModelFilter("");
    setYearFilter("");
    setPriceRangeFilter([0, 1000]);
  };

  return (
    <>
      <div className="cars-page p-4 relative brightness-100">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: 'url("images/background/carsBackground2.jpg")',
            backgroundAttachment: "fixed",
          }}
        ></div>
        <CarsHero />
        <h1 className="my-10 text-lg ml-5 font-bold text-gray-900 sm:text-3xl brightness-100 dark:text-white">
          {isEnglish ? "Our Cars :" : "سياراتنا :"}
        </h1>
        <div id="sort" className="flex justify-end items-center gap-4 brightness-100">
          <select
            className="p-2 rounded border border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
            onChange={(e) => {
              const sortBy = e.target.value;
              const sortedCars = [...filteredCars].sort((a, b) => {
                if (sortBy === "priceAsc") return a.price - b.price;
                if (sortBy === "priceDesc") return b.price - a.price;
                if (sortBy === "yearAsc") return a.year - b.year;
                if (sortBy === "yearDesc") return b.year - a.year;
                return 0;
              });
              setFilteredCars(sortedCars);
            }}
          >
            <option value="">{isEnglish ? "Sort By" : "ترتيب حسب"}</option>
            <option value="priceAsc">
              {isEnglish ? "Price: Low to High" : "السعر: من الأقل إلى الأعلى"}
            </option>
            <option value="priceDesc">
              {isEnglish ? "Price: High to Low" : "السعر: من الأعلى إلى الأقل"}
            </option>
            <option value="yearAsc">
              {isEnglish ? "Year: Old to New" : "السنة: من الأقدم إلى الأحدث"}
            </option>
            <option value="yearDesc">
              {isEnglish ? "Year: New to Old" : "السنة: من الأحدث إلى الأقدم"}
            </option>
          </select>
        </div>
        <div className="flex flex-col brightness-100 my-10 gap-2 lg:flex-row">
          <FiltersSettings
            uniqueMakes={uniqueMakes}
            uniqueModels={uniqueModels}
            uniqueYears={uniqueYears}
            minPrice={minPrice}
            maxPrice={maxPrice}
            makeFilter={makeFilter}
            setMakeFilter={setMakeFilter}
            modelFilter={modelFilter}
            setModelFilter={setModelFilter}
            yearFilter={yearFilter}
            setYearFilter={setYearFilter}
            priceRangeFilter={priceRangeFilter}
            setPriceRangeFilter={setPriceRangeFilter}
            resetFilters={resetFilters}
          />
          <div className="brightness-100 flex-1 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
            <CarsPageList cars={currentCars} />
            <PaginationControls
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
}
