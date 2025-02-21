import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { Users, Settings, Fuel, Gauge, Calendar, Clock, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

export default function RentCar(){
  const { id } = useParams();
  const cars = useSelector(state => state.cars);
  const car = cars.find(car => car.id === id);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Please fill all the fields.");
      return;
    }
    alert("Car reserved successfully");
  }
  return (
    <>
      <div className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 my-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
        Back
      </button>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{car.name} {car.model}</h1>
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={car.image} 
                  alt={`${car.name} ${car.model}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="text-blue-600" />
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Fuel className="text-blue-600" />
                  <span>{car.type }</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg h-full flex flex-col justify-between">
                <h2 className="text-2xl font-semibold mb-4">Rental Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pick-up Date</label>
                    <div className="mt-1 relative">
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Return Date</label>
                    <div className="mt-1 relative">
                      <input
                        type="date"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-2xl font-bold text-blue-600">${car.price || 100}/day</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                  >
                    Reserve Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}