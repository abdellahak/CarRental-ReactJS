import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function TopPerformers({ contracts, cars }) {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const [data, setData] = useState([]);

  useEffect(() => {
    // Process contracts data to get top performing cars
    const carRentals = {};

    contracts.forEach((contract) => {
      if (!carRentals[contract.carId]) {
        carRentals[contract.carId] = {
          carId: contract.carId,
          count: 0,
          revenue: 0,
        };
      }

      carRentals[contract.carId].count++;
      carRentals[contract.carId].revenue += Number.parseInt(contract.price);
    });

    // Convert to array, add car details, and sort by count
    const topCars = Object.values(carRentals)
      .map((item) => {
        const car = cars.find((car) => car.id === item.carId);
        return {
          ...item,
          name: car ? `${car.name} ${car.model}` : `Car #${item.carId}`,
          type: car ? car.type : isEnglish ? "unknown" : "غير معروف",
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 cars

    setData(topCars);
  }, [contracts, cars, isEnglish]);

  return (
    <div className="space-y-4">
      {data.map((car, index) => (
        <div key={car.carId} className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mx-3 text-blue-600">
            {index + 1}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{car.name}</div>
            <div className="text-xs text-gray-500">{car.type}</div>
          </div>
          <div className="text-sm font-medium mx-2">
            {car.count} {isEnglish ? "rentals" : "إيجارات"}
          </div>
        </div>
      ))}
    </div>
  );
}
