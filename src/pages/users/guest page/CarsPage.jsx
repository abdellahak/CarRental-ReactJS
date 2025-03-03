import { useSelector, useDispatch } from "react-redux";
export default function CarsPage() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const cars = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  return (
    <div className="cars-page p-4">
      <h1 className="text-3xl font-bold mb-6">{isEnglish ? "Cars Page" : "Page des Voitures"}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="car-card bg-white shadow-md rounded-lg overflow-hidden">
            <img src={car.image} alt={`${car.name} ${car.model}`} className="car-image w-full h-48 object-cover" />
            <div className="car-details p-4">
              <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
              <p className="text-gray-700">{isEnglish ? "Model" : "Modèle"}: {car.model}</p>
              <p className="text-gray-700">{isEnglish ? "Price" : "Prix"}: ${car.price}</p>
              <p className="text-gray-700">{isEnglish ? "Rating" : "Évaluation"}: {car.rating}</p>
              <p className="text-gray-700">{isEnglish ? "Type" : "Type"}: {car.type}</p>
              <p className="text-gray-700">{isEnglish ? "Year" : "Année"}: {car.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}