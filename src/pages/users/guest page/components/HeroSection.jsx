
export default function HeroSection() {
  return (
    <>
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 pt-16 md:pt-0">
            <h2 className="text-xl text-gray-700 mb-4">Plan your trip now</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Save <span className="text-blue-600">big</span> with our<br />
              car rental
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg">
              Rent the car of your dreams. Unbeatable prices, unlimited miles, 
              flexible pick-up options and much more.
            </p>
            {/* <div className="flex space-x-4">
              <button className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition duration-300">
                Book Ride
              </button>
              <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition duration-300">
                Learn More
              </button>
            </div> */}
          </div>

          {/* Right Content - Car Image */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <img 
              src="images/hero/heroImage.jpg"
              alt="Red Car"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Background Design */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-red-50 -z-10"></div>
      </div>
    </>
  );
}
