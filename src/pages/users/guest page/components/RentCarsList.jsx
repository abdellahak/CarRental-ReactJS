

export default function RentCarsList({filteredCars}) {
  return (
    <>
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">OUR BEST OFFERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center">
            {filteredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 w-80 h-80    ">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={car.image}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-center">{car.name}</h3>
                  <p className="text-blue-600 text-center text-lg">{car.model}</p>
                  <button className="cursor-pointer mt-4 mx-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}