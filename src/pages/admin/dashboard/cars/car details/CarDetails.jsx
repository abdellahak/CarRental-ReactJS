import React from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Fuel } from "lucide-react";
import { useSelector } from "react-redux";

const CarDetails = () => {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const { id } = useParams();
  const navigate = useNavigate();

  const car = useSelector((state) => state.cars.find((car) => car.id === id));

  if (!car) {
    return (
      <h2 className="text-center text-2xl font-semibold text-red-600 my-6 dark:text-red-400">
        {isEnglish ? "Car not found" : "السيارة غير موجودة"}
      </h2>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-2 dark:bg-gray-900 dark:text-gray-100">
      <button
        onClick={() => navigate(-1)}
        to="/cars"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 my-6 cursor-pointer dark:text-blue-400 dark:hover:text-blue-600"
      >
        {isEnglish ? (
          <ArrowLeft className="w-4 h-4 mx-2"></ArrowLeft>
        ) : (
          <ArrowRight className="w-4 h-4 mx-2"></ArrowRight>
        )}
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
            <h1 className="text-4xl font-bold text-white mb-2">{car.model}</h1>
            <div className="flex items-center text-white gap-2">
              <MapPin className="h-4 w-4"></MapPin>
              {isEnglish
                ? "Lamzar - Ait Melloul - Agadir"
                : "لامزار - أيت ملول - أكادير"}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                {isEnglish ? "Daily pay" : "الدفع اليومي"}
              </p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {car.price} {isEnglish ? "DH" : "درهم"}
              </p>
            </div>
            <Link
              to="/dashboard/contracts/add"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isEnglish ? "Add contract" : "إضافة عقد"}
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-8 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">
              {isEnglish ? "Features & Specifications" : "الميزات والمواصفات"}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {/* feature number 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400"></Calendar>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {isEnglish ? "Year" : "السنة"} {car.year}
                </span>
              </div>
              {/* feature number 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                  <Fuel className="h-5 w-5 text-blue-600 dark:text-blue-400"></Fuel>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {isEnglish ? "Fuel" : "الوقود"} {car.type}
                </span>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="border-t border-gray-200 mt-8 pt-8 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">
              {isEnglish ? "Informations" : "معلومات"} :
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              <p>
                {isEnglish ? "This car is a" : "هذه السيارة هي"} {car.model}{" "}
                {isEnglish ? "from the year" : "من سنة"} {car.year}{" "}
                {isEnglish ? "with a" : "بـ"} {car.type}{" "}
                {isEnglish ? "fuel type." : "نوع الوقود."}
                {isEnglish
                  ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea maxime quae earum consequuntur aut ratione culpa pariatur ab at soluta!"
                  : "لوريم إيبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا ."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
