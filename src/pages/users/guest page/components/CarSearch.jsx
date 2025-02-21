import { ChevronDown } from 'lucide-react';

export default function CarSearch() {

  return (
    <>
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Search Your Best Cars</h2>
            <p className="text-gray-400">Find your perfect ride with our extensive collection of premium vehicles</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="w-full md:w-64 relative">
              <select 
                className="w-full px-4 py-3 rounded-md bg-white appearance-none cursor-pointer pr-10"
                // value={selectedBrand}
                // onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Choose a Brand</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="ford">Ford</option>
                <option value="bmw">BMW</option>
                <option value="mercedes">Mercedes</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none h-5 w-5" />
            </div>

            <div className="w-full md:w-64 relative">
              <select 
                className="w-full px-4 py-3 rounded-md bg-white appearance-none cursor-pointer pr-10"
                // value={selectedModel}
                // onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="">Select Model</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="sports">Sports</option>
                <option value="luxury">Luxury</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none h-5 w-5" />
            </div>

            <div className="w-full md:w-64 relative">
              <select 
                className="w-full px-4 py-3 rounded-md bg-white appearance-none cursor-pointer pr-10"
                // value={selectedLocation}
                // onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="miami">Miami</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none h-5 w-5" />
            </div>

            <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800 cursor-pointer transition duration-300">
              SEARCH NOW
            </button>
          </div>
        </div>
      </div>
    </>
  )
}