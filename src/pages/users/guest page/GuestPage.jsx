import HeroSection from "./components/HeroSection";
import CarSearch from "./components/CarSearch";
import RentCarsList from "./components/RentCarsList";
import { Slider } from "../../../components/user/Slider";
import InfiniteCarousel from "../../../components/user/InfiniteCarousel";
import OurTeam from "./components/OurTeam";
import FeaturesSection from "./components/FeaturesSection";
import FaqSection from "./components/FaqSection";

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
      <InfiniteCarousel />
      <Slider />
      <CarSearch />
      <RentCarsList filteredCars={filteredCars} />
      <FeaturesSection />
      <FaqSection />
      <OurTeam />
    </>
  );
}
