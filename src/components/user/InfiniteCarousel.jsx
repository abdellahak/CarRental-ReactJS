import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const brands = [
  {
    name: "Toyota",
    logo: "images/cars logo/toyota-logo.jpg",
  },
  {
    name: "Honda",
    logo: "images/cars logo/honda-logo.png",
  },
  {
    name: "BMW",
    logo: "images/cars logo/bmw-logo.png",
  },
  {
    name: "Mercedes-Benz",
    logo: "images/cars logo/Mercedes-Logo.png",
  },
  {
    name: "Audi",
    logo: "images/cars logo/audi-logo.png",
  },
  {
    name: "Ford",
    logo: "images/cars logo/ford-logo.png",
  },
  {
    name: "Chevrolet",
    logo: "images/cars logo/chevrolet-logo.png",
  },
  {
    name: "Volkswagen",
    logo: "images/cars logo/volkswagen-logo.png",
  },
  {
    name: "Nissan",
    logo: "images/cars logo/nissan-logo.png",
  },
  {
    name: "Hyundai",
    logo: "images/cars logo/hyundai-logo.png",
  },
  {
    name: "Dacia",
    logo: "images/cars logo/dacia-logo.png",
  },
  {
    name: "Jeep",
    logo: "images/cars logo/jeep-logo.png",
  },
  {
    name: "Tesla",
    logo: "images/cars logo/tesla-logo.png",
  },
  {
    name: "Ferrari",
    logo: "images/cars logo/ferrari-logo.png",
  },
  {
    name: "Maserati",
    logo: "images/cars logo/maserati-logo.png",
  },
  {
    name: "Porsche",
    logo: "images/cars logo/porsche-logo.png",
  },
  {
    name: "Rolls Royce",
    logo: "images/cars logo/rollsRoyce-logo.png",
  },
  {
    name: "Alfa Romeo",
    logo: "images/cars logo/alfaRomeo-logo.png",
  },
  {
    name: "Mazda",
    logo: "images/cars logo/mazda-logo.png",
  },
  {
    name: "Renault",
    logo: "images/cars logo/renault-logo.png",
  },
];

const InfiniteCarousel = () => {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth / 2;

    const scroll = () => {
      if (carousel.scrollLeft >= scrollWidth) {
        carousel.classList.remove("scroll-smooth");
        carousel.scrollLeft = 0;
        setTimeout(() => carousel.classList.add("scroll-smooth"), 50);
      } else {
        carousel.scrollLeft += 1;
      }
      setScrollPosition(carousel.scrollLeft);
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);

  const doubledBrands = [...brands, ...brands];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white my-8 animate-bounce text-center">
        {isEnglish ? "Discover the best car brands available for booking" : "اكتشف أفضل ماركات السيارات المتاحة للحجز"}
      </h1>
      <div className="w-full">
        <div className="w-full overflow-hidden">
          <div
            ref={carouselRef}
            className="flex scroll-smooth overflow-x-auto whitespace-nowrap py-6 scrollbar-hide !ltr"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {doubledBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="inline-block flex-none mx-1 transition-transform duration-300 hover:scale-105 
                relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(95deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(95deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms] cursor-pointer"
              >
                <div
                  className={`shadow-lg p-6 w-48 aspect-square flex flex-col items-center justify-center transition-colors duration-300 dark:bg-gray-500 dark:text-white dark:shadow-gray-900/50 bg-brand-200 text-gray-800 shadow-gray-200/50`}
                >
                  <div
                    className={`aspect-square w-full flex items-center justify-center mb-2 rounded p-2`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-26 object-contain"
                    />
                  </div>
                  <p
                    className={`font-semibold text-center transition-colors duration-300 dark:text-gray-200 text-gray-800`}
                  >
                    {brand.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;
