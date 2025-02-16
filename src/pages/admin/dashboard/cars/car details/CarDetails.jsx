import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Fuel } from "lucide-react";
import { useSelector } from "react-redux";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = useSelector((state) => state.cars.find((car) => car.id === id));
  
  

  if (!car) {
    return <h2 className="text-center text-2xl font-semibold text-red-600 my-6">Car not found</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-2   ">
      <button
        onClick={()=>navigate(-1)}
        to="/cars"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 my-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
        Back
      </button>
      <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-10">
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
              Lamzar - Ait Melloul - Agadir
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Daily pay</p>
              <p className="text-4xl font-bold text-blue-600">{car.price} DH  </p>
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              Add contract
            </button>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold mb-6">
              Features & Specifications
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {/* feature number 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600"></Calendar>
                </div>
                <span className="text-gray-700">Year {car.year}</span>
              </div>
              {/* feature number 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Fuel className="h-5 w-5 text-blue-600"></Fuel>
                </div>
                <span className="text-gray-700">Fuel {car.type}</span>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="border-t border-gray-200 mt-8 pt-8">
            <h2 className="text-2xl font-semibold mb-6">Informations : </h2>
            <div className="text-gray-600">
              <p>
                this car is a {car.model} from the year {car.year} with a {car.type} fuel type.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea maxime quae earum consequuntur aut ratione culpa pariatur ab at soluta!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
