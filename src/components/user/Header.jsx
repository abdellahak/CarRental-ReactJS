import {Car} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="lg:px-16 px-6 bg-[#1a2234] flex flex-wrap items-center lg:py-0 py-2 fixed w-full z-10 top-0">
        <div className="flex-1 flex justify-between items-center">
          <Link className="text-white text-2xl md:text-4xl flex items-center gap-2 font-bold">
            <Car className="text-white h-12 w-12" />
            Mingo Cars
          </Link>
        </div>

        <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="lg:flex items-center justify-between text-base text-gray-200 pt-4 lg:pt-0">
              <li>
                <a
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                  href="#"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                  href="#"
                >
                  Contact
                </a>
              </li>
              {/* <li>
                <a
                  className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2"
                  href="#"
                >
                  Support
                </a>
              </li> */}
            </ul>
          </nav>
          {/* <a
            href="#"
            className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor"
          >
            <img
              className="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400"
              src="https://pbs.twimg.com/profile_images/1128143121475342337/e8tkhRaz_normal.jpg"
              alt="Andy Leverenz"
            />
          </a> */}
        </div>
      </header>
    </>
  );
};

export default Header;
