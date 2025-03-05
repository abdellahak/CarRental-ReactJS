import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeroCarCard from "./HeroCarCard";

export default function CarsHero() {
  const cars = useSelector((state) => state.cars);
  const lastCars = cars.sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-6">Our Best Cars</h2>
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <Link to={`/car/${lastCars[0].id}`}>
          <HeroCarCard
            car={lastCars[0]}
            imgStyle={
              "hidden size-full rounded-lg object-cover lg:block dark:filter brightness-100 hover:scale-105 duration-300 linear"
            }
          />
        </Link>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8 ">
          <Link to={`/car/${lastCars[1].id}`}>
            <HeroCarCard
              car={lastCars[1]}
              imgStyle={
                "aspect-3/2 w-full rounded-lg object-cover dark:filter brightness-100 dark:brightness-100 duration-300 linear"
              }
            />
          </Link>
          <Link to={`/car/${lastCars[2].id}`}>
            <HeroCarCard
              car={lastCars[2]}
              imgStyle={
                "aspect-3/2 w-full rounded-lg object-cover dark:filter brightness-100 hover:scale-105 duration-300 linear"
              }
            />
          </Link>
        </div>
        <Link to={`/car/${lastCars[3].id}`}>
          <HeroCarCard
            car={lastCars[3]}
            imgStyle={
              "aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto dark:filter brightness-100 hover:scale-105 duration-300 linear"
            }
          />
        </Link>
      </div>
    </>
  );
}
