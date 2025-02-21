import HeroSection from "./components/HeroSection";
import CarSearch from "./components/CarSearch";
import RentCarsList from "./components/RentCarsList";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GuestPage() {
  const cars = useSelector((state) => state.cars);
  
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  return (
    <>
      <HeroSection />
      <CarSearch />
      <RentCarsList filteredCars={filteredCars} />
    </>
  );
}
