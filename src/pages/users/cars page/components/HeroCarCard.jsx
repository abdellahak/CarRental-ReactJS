import { ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";
export default function HeroCarCard({ car, imgStyle}) {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-300" : "text-gray-200 dark:text-gray-600"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  };
  {
    return (
      <>
        <div className="group relative h-full overflow-hidden rounded-lg hover:scale-105 duration-500 ">
          <div className="absolute z-9 bottom-0 left-0 right-0 top-0 backdrop-blur-sm cursor-pointer opacity-0 group-hover:opacity-100 p-4 flex items-center justify-center">
            <div className="absolute top-4 left-4 text-white flex gap-2">
              <span className="inline-flex items-center justify-center gap-1 rounded-full bg-gray-400 px-2.5 py-0.5 text-sm font-medium text-white dark:bg-gray-900 dark:text-white/80">
                {car.name} {car.model}
              </span>
              <span className="inline-flex items-center justify-center gap-1 rounded-full bg-blue-light-500 px-2.5 py-0.5 text-sm font-medium text-white">
                {car.price} {isEnglish ? "MAD/Day" : "درهم/يوم"}
              </span>
            </div>
            <div className="h-12 w-12 rounded-full bg-brand-600 flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center mt-2.5 absolute bottom-4 left-4 bg-brand-500 dark:bg-gray-900 rounded-md p-1">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {renderStars(car.rating)}
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                {car.rating}
              </span>
            </div>
          </div>
          <img
            alt={car.name}
            src={car.image}
            className={imgStyle}
          />
        </div>
      </>
    );
  }
}
