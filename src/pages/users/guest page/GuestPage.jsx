import HeroSection from "./components/HeroSection";
import CarSearch from "./components/CarSearch";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function GuestPage() {
  const cars = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const [filteredCars, setFilteredCars] = useState(cars.filter(car => car.isAvailable));
  const [searchQuery, setSearchQuery] = useState("");

  console.log(filteredCars);
  return (
    <>
      <HeroSection />
      <CarSearch />
    </>
  );
}