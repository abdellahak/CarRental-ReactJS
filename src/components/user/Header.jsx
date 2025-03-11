import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkModeToggle from "../context/DarkModeToggle";
import LanguageToggle from "../context/LanguageToggle";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConfirmAlert from "../context/ConfirmAlert";

export default function Header() {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const authentification = useSelector((state) => state.auth);
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToFeatures = () => {
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    setShowConfirmAlert(true);
  };

  const handleConfirmLogout = () => {
    dispatch({ type: "LOGOUT" });
    setShowConfirmAlert(false);
  };

  const handleCloseAlert = () => {
    setShowConfirmAlert(false);
  };

  return (
    <>
      <Disclosure
        as="nav"
        className={`${
          isScrolled
            ? "bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"
            : " dark:bg-gray-900 dark:from-gray-900 dark:to-gray-900"
        } border-b transition-colors duration-300`}
      >
        <div dir="ltr" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link to="/">
                  <img
                    alt="Mingo Cars"
                    src="/images/logo/mingo cars logo.png"
                    className="h-12 w-auto hidden dark:block"
                  />
                  <img
                    alt="Mingo Cars"
                    src="/images/logo/mingo cars logo light.png"
                    className="h-12 w-auto block dark:hidden"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    aria-current="page"
                    className={`${
                      location.pathname === "/"
                        ? "bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
                        : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105`}
                  >
                    {isEnglish ? "Home" : "الرئيسية"}
                  </Link>
                  {authentification.isAuthenticated &&
                    authentification.user.role === "admin" && (
                      <Link
                        to="/dashboard"
                        aria-current="page"
                        className={`${
                          location.pathname === "/dashboard"
                            ? "bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
                            : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        } rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105`}
                      >
                        {isEnglish ? "Dashboard" : "لوحة التحكم"}
                      </Link>
                    )}
                  {authentification.isAuthenticated &&
                    authentification.user.role === "user" && (
                      <Link
                        to="/myCars"
                        className={`${
                          location.pathname === "/myCars"
                            ? "bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
                            : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        } rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105`}
                      >
                        {isEnglish ? "My rented cars" : "سياراتي المستأجرة"}
                      </Link>
                    )}
                  <Link
                    to="/cars"
                    className={`${
                      location.pathname === "/cars"
                        ? "bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
                        : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105`}
                  >
                    {isEnglish ? "Cars" : "السيارات"}
                  </Link>
                  <Link
                    to="/about"
                    className={`${
                      location.pathname === "/about"
                        ? "bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
                        : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105`}
                  >
                    {isEnglish ? "About Us" : "معلومات عنا"}
                  </Link>
                  <Link
                    to="/contact"
                    className={`${
                      location.pathname === "/contact"
                        ? "bg-gray-200 text-black dark:bg-gray-600 dark:text-white"
                        : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105`}
                  >
                    {isEnglish ? "Contact Us" : "اتصل بنا"}
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="mx-2">
                <DarkModeToggle />
              </div>
              <div className="mx-2">
                <LanguageToggle />
              </div>
              {authentification.isAuthenticated && (
                <>
                  {/* <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-900 hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button> */}

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none dark:bg-gray-900">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt={authentification.user.name}
                          src={
                            authentification.user.image ||
                            "/images/users/defaultUser.jpg"
                          }
                          className="size-8 rounded-full object-cover"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:ring-white/10"
                    >
                      <MenuItem>
                        <div className="px-4 py-2">
                          <span className="block text-lg ">
                            {authentification.user.name}
                          </span>
                          <span className="block truncate text-sm font-medium">
                            {authentification.user.email}
                          </span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-900 data-focus:bg-gray-100 data-focus:outline-none dark:text-gray-300 dark:data-focus:bg-gray-700"
                        >
                          {isEnglish ? "Your Profile" : "ملفك الشخصي"}
                        </Link>
                      </MenuItem>
                      {/* <MenuItem>
                        <Link
                          to="#"
                          className="block px-4 py-2 text-sm text-gray-900 data-focus:bg-gray-100 data-focus:outline-none dark:text-gray-300 dark:data-focus:bg-gray-700"
                        >
                          {isEnglish ? "Settings" : "الإعدادات"}
                        </Link>
                      </MenuItem> */}
                      <MenuItem>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-900 data-focus:bg-gray-100 data-focus:outline-none dark:text-gray-300 dark:data-focus:bg-gray-700"
                        >
                          {isEnglish ? "Sign out" : "تسجيل الخروج"}
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </>
              )}
              {!authentification.isAuthenticated && (
                <div className="flex gap-2">
                  {location.pathname !== "/login" && (
                    <Button asChild className={"hidden sm:block"}>
                      <Link to="/login">
                        {isEnglish ? "Login" : "تسجيل الدخول"}
                      </Link>
                    </Button>
                  )}
                  {location.pathname !== "/register" && (
                    <Button
                      asChild
                      className="hidden sm:block bg-gray-700 text-white hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      <Link to="/register">
                        {isEnglish ? "Register" : "تسجيل جديد"}
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <DisclosureButton
              as={Link}
              to="/"
              aria-current="page"
              className={`${
                location.pathname === "/"
                  ? "bg-gray-900 text-white dark:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              } block rounded-md px-3 py-2 text-base font-medium transition duration-300 ease-in-out transform hover:scale-102`}
            >
              {isEnglish ? "Home" : "الرئيسية"}
            </DisclosureButton>
            {authentification.isAuthenticated &&
              authentification.user.role === "user" && (
                <DisclosureButton
                  as={Link}
                  to="/myCars"
                  className={`${
                    location.pathname === "/myCars"
                      ? "bg-gray-900 text-white dark:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  } block rounded-md px-3 py-2 text-base font-medium transition duration-300 ease-in-out transform hover:scale-102`}
                >
                  {isEnglish ? "My rented cars" : "سياراتي المستأجرة"}
                </DisclosureButton>
              )}
            <DisclosureButton
              as={Link}
              to="/cars"
              className={`${
                location.pathname === "/cars"
                  ? "bg-gray-900 text-white dark:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              } block rounded-md px-3 py-2 text-base font-medium transition duration-300 ease-in-out transform hover:scale-102`}
            >
              {isEnglish ? "Cars" : "السيارات"}
            </DisclosureButton>
            <DisclosureButton
              as={Link}
              to="/about"
              className={`${
                location.pathname === "/about"
                  ? "bg-gray-900 text-white dark:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              } block rounded-md px-3 py-2 text-base font-medium transition duration-300 ease-in-out transform hover:scale-102`}
            >
              {isEnglish ? "About Us" : "معلومات عنا"}
            </DisclosureButton>
            <DisclosureButton
              as={Link}
              to="/contact"
              className={`${
                location.pathname === "/contact"
                  ? "bg-gray-900 text-white dark:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              } block rounded-md px-3 py-2 text-base font-medium transition duration-300 ease-in-out transform hover:scale-102`}
            >
              {isEnglish ? "Contact Us" : "اتصل بنا"}
            </DisclosureButton>
            {location.pathname !== "/login" && (
              <DisclosureButton
                as={Link}
                to="/login"
                className={`${
                  location.pathname ===
                  "block sm:hidden text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                } block rounded-md px-3 py-2 text-base font-medium transition duration-300 ease-in-out transform hover:scale-102`}
              >
                {isEnglish ? "Login" : "تسجيل الدخول"}
              </DisclosureButton>
            )}
            {location.pathname !== "/register" && (
              <DisclosureButton
                as={Link}
                to="/register"
                className={`${
                  location.pathname ===
                  "block sm:hidden text-gray-900 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                } block rounded-md px-3 py-2 text-base font-medium transition duration-300 ease-in-out transform hover:scale-102`}
              >
                {isEnglish ? "Register" : "تسجيل جديد"}
              </DisclosureButton>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {showConfirmAlert && (
        <ConfirmAlert
          onClose={handleCloseAlert}
          onConfirm={handleConfirmLogout}
          title={isEnglish ? "Confirm Logout" : "تأكيد تسجيل الخروج"}
          message={
            isEnglish
              ? "Are you sure you want to logout?"
              : "هل أنت متأكد أنك تريد تسجيل الخروج؟"
          }
        />
      )}
    </>
  );
}
