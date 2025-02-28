import {
  FigmaLogoIcon,
  FramerLogoIcon,
  SketchLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
  VercelLogoIcon,
  NotionLogoIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const LOGOS = [
  <img src="images/cars logo/bmw-logo.png" alt="Dacia" />,
  <img src="images/cars logo/Dacia-logo.png" alt="Dacia" />,
  <img src="images/cars logo/jeep-logo.png" alt="Dacia" />,
  <img src="images/cars logo/nissan-logo.png" alt="Dacia" />,
  <img src="images/cars logo/volkswagen-logo.png" alt="Dacia" />,
  <img src="images/cars logo/tesla-logo.png" alt="Dacia" />,
  <img src="images/cars logo/honda-logo.png" alt="Dacia" />,
  <img src="images/cars logo/chevrolet-logo.png" alt="Dacia" />,
  <img src="images/cars logo/ferrari-logo.png" alt="Dacia" />,
  <img src="images/cars logo/maserati-logo.png" alt="Dacia" />,
  <img src="images/cars logo/porsche-logo.png" alt="Dacia" />,
  <img src="images/cars logo/rollsRoyce-logo.png" alt="Dacia" />,
  <img src="images/cars logo/alfaRomeo-logo.png" alt="Dacia" />,
  <img src="images/cars logo/mazda-logo.png" alt="Dacia" />,
  <img src="images/cars logo/renault-logo.png" alt="Dacia" />,
  <img src="images/cars logo/toyota-logo.jpg" alt="Dacia" />,
  <img src="images/cars logo/audi-logo.png" alt="Dacia" />,
  <img src="images/cars logo/ford-logo.png" alt="Dacia" />,
];
export default function NavbarComponent() {
  return (
    <div className="relative m-auto w-full overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <div className="animate-infinite-slider flex w-[calc(250px*10)]">
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[150px] aspect-square p-4 bg-black items-center justify-center hover:bg-gray-600"
            key={index}
          >
            {logo}
          </div>
        ))}
        {LOGOS.map((logo, index) => (
          <div
            className="slide flex w-[150px] aspect-square p-4 bg-black items-center justify-center hover:bg-gray-600"
            key={index}
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
