import { Carousel } from "flowbite-react";

export function Slider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src="images/slider/urban-slider.webp" alt="..." />
        <img src="images/slider/defender-slider.webp" alt="..." />
        <img src="images/slider/thar-slider.jpg" alt="..." />
        <img src="images/slider/syros-slider.jpg" alt="..." />
        <img src="images/slider/rsq8-slider.webp" alt="..." />
      </Carousel>
    </div>
  );
}
