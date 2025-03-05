import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slideImages = [
  "images/slider/urban-slider.png",
  "images/slider/defender-slider.png",
  "images/slider/thar-slider.png",
  "images/slider/syros-slider.png",
  "images/slider/rsq8-slider.png",
];

export default function NavBarComponent() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="w-full flex justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slideImages.map((item, index) => (
            <CarouselItem key={index} className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Card className="p-0 h-full w-full  flex justify-center items-center">
                  <CardContent className="p-0">
                    <img src={item} alt="..." className="w-full h-full object-cover" />
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-5 top-1/2 transform -translate-y-1/2 h-16 w-16" />
        <CarouselNext className="absolute right-5 top-1/2 transform -translate-y-1/2 h-16 w-16" />
      </Carousel>
    </div>
  );
}
