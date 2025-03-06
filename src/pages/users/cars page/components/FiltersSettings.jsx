import { useSelector } from "react-redux";
export default function FiltersSettings({
  uniqueMakes,
  uniqueModels,
  uniqueYears,
  minPrice,
  maxPrice,
  makeFilter,
  setMakeFilter,
  modelFilter,
  setModelFilter,
  yearFilter,
  setYearFilter,
  priceRangeFilter,
  setPriceRangeFilter,
  resetFilters
}) {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  return (
    <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg lg:w-1/4" id="filters">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {isEnglish ? "Filters" : "فلاتر"}
      </h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isEnglish ? "Brand" : "ماركة"}
        </label>
        <select
          value={makeFilter}
          onChange={(e) => setMakeFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <option value="">{isEnglish ? "All" : "الكل"}</option>
          {uniqueMakes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isEnglish ? "Model" : "نموذج"}
        </label>
        <select
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <option value="">{isEnglish ? "All" : "الكل"}</option>
          {uniqueModels.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isEnglish ? "Year" : "سنة"}
        </label>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <option value="">{isEnglish ? "All" : "الكل"}</option>
          {uniqueYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isEnglish ? "Price Range" : "نطاق السعر"}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRangeFilter[0]}
            onChange={(e) =>
              setPriceRangeFilter([Number(e.target.value), priceRangeFilter[1]])
            }
            className="w-full"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRangeFilter[1]}
            onChange={(e) =>
              setPriceRangeFilter([priceRangeFilter[0], Number(e.target.value)])
            }
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>{priceRangeFilter[0]} MAD</span>
          <span>{priceRangeFilter[1]} MAD</span>
        </div>
      </div>
      <button
        onClick={resetFilters}
        className="w-full bg-red-100 text-red-800 p-3 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
      >
        {isEnglish ? "Reset Filters" : "إعادة تعيين الفلاتر"}
      </button>
    </div>
  );
}
