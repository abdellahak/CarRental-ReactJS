import { Link } from "react-router-dom";

function Car({ car, deleteCar }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className={`h-4 w-4 ${car.available? "bg-green-600": "bg-red-600"} absolute top-6 right-6 rounded-full animate-ping`}></div>
        <div className={`h-4 w-4 ${car.available? "bg-green-600": "bg-red-600"} absolute top-6 right-6 rounded-full`}></div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
          <h3 className="text-lg font-semibold">{car.model}</h3>
          <h6 className="px-1 text-sm font-semibold text-gray-500">{car.name}</h6>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{car.price} MAD</span>
            <span className="text-gray-500 text-sm block">per day</span>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between">
            <p className="font-bold text-sm">Year : </p>
            <p className="text-sm text-gray-600 mb-1">{car.year}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-sm">Type : </p>
            <p className="text-sm text-gray-600 mb-1">{car.type}</p>
          </div>
          <p className="text-xs text-gray-500">Agadir</p>
        </div>
        <div className="mt-4 flex justify-stretch flex-wrap gap-1">
          <Link
            to={`/cars/edit/${car.id}`}
            className="text-center mt-1 flex-1 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors block"
          >
            Modify
          </Link>
          <button
            onClick={() => {
              deleteCar(car.id);
            }}
            className="text-center mt-1 flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors block"
          >
            Delete
          </button>
          <Link
            to={`/cars/${car.id}`}
            className="text-center mt-1 flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors block"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Car;
