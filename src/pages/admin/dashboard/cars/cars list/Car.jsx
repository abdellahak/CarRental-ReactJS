import { Link, useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";

function Car({ car, deleteCar }) {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const navigate = useNavigate();
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group cursor-pointer 
      hover:border-brand-600 dark:hover:border-brand-400 border-2 border-transparent transition-colors ease-in-out duration-300"
      onClick={() => navigate(`/dashboard/cars/${car.id}`)}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover duration-500 group-hover:scale-110 ease-in-out transition-transform"
          loading="lazy"
        />
        <div
          className={`h-4 w-4 ${
            car.available ? "bg-green-600" : "bg-red-600"
          } absolute top-6 right-6 rounded-full animate-ping`}
        ></div>
        <div
          className={`h-4 w-4 ${
            car.available ? "bg-green-600" : "bg-red-600"
          } absolute top-6 right-6 rounded-full`}
        ></div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold dark:text-white">{car.model}</h3>
            <h6 className="px-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
              {car.name}
            </h6>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold dark:text-white">{car.price} {isEnglish ? "MAD" : "درهم"}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm block">{isEnglish ? "per day" : "في اليوم"}</span>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
          <div className="flex justify-between">
            <p className="font-bold text-sm dark:text-gray-300">{isEnglish ? "Year :" : "السنة :"}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{car.year}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-sm dark:text-gray-300">{isEnglish ? "Type :" : "النوع :"}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{car.type}</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{isEnglish ? "Agadir" : "أكادير"}</p>
        </div>
        <div className="mt-4 flex justify-stretch flex-wrap gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/cars/edit/${car.id}`);
            }}
            className="cursor-pointer text-center mt-1 flex-1 bg-brand-600 dark:bg-brand-500 text-white py-2 px-4 rounded-md hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors block"
          >
            {isEnglish ? "Modify" : "تعديل"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteCar(car.id);
            }}
            className="text-center mt-1 flex-1 bg-brand-600 dark:bg-brand-500 text-white py-2 px-4 rounded-md hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors block cursor-pointer"
          >
            {isEnglish ? "Delete" : "حذف"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/cars/${car.id}`);
            }}
            className="cursor-pointer text-center mt-1 flex-1 bg-brand-600 dark:bg-brand-500 text-white py-2 px-4 rounded-md hover:bg-brand-700 dark:hover:bg-brand-600 transition-colors block"
          >
            {isEnglish ? "Details" : "تفاصيل"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Car;
