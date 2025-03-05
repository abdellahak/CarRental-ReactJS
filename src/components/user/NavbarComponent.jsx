import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function NavbarComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemsToShow = 5;
  const cars = useSelector(state => state.cars);
  const lastCars = cars.slice(0,10);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= lastCars.length - itemsToShow + 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? lastCars.length - itemsToShow : prevIndex - 1
    );
  };

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 3 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full mx-auto px-4 py-8 bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        >
          <FaChevronLeft className="text-white text-xl dark:text-gray-300" />
        </button>

        <div className="overflow-hidden mx-8">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {lastCars.map((item) => (
              <div key={item.id} className="flex-none w-1/5">
                <div className="relative group cursor-pointer mx-2" onClick={() => {
                  navigate(`/car/${item.id}`)
                }}>
                  <div className="relative overflow-hidden rounded-lg">
                    {item.rating && <div className="absolute top-6 -left-4 w-[150px] text-center px-4 py-2 bg-amber-300 text-white text-base transform -rotate-45 -translate-x-1/5 -translate-y-1/2">{item.rating}</div>}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-white text-lg font-bold text-center">
                          {item.name} {" "} {item.model}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        >
          <FaChevronRight className="text-white text-xl dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}
