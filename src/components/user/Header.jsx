"use client";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import DarkModeToggle from "../context/DarkModeToggle";
import LanguageToggle from "../context/LanguageToggle";
import { UserPlus, LogIn } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const authentification = useSelector((state) => state.auth);
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="bg-white border-gray-200 dark:border-gray-700 dark:bg-gray-900 lg:border-b fixed top-0 left-0 right-0 z-50">
      <Navbar className="bg-transparent">
        <Navbar.Brand href="/">
          <img
            src="/images/logo/logo-black.png"
            className="mr-3 h-12 sm:h-14 dark:hidden"
            alt="Mingo Cars"
          />
          <img
            src="/images/logo/logo-white.png"
            className="mr-3 h-12 sm:h-14 hidden dark:block"
            alt="Mingo Cars"
          />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <div className="mx-2">
            <DarkModeToggle />
          </div>
          <div className="mx-2">
            <LanguageToggle />
          </div>
          {authentification.isAuthenticated && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={authentification.user.image}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-lg">
                  {authentification.user.name}
                </span>
                <span className="block truncate text-sm font-medium">
                  {authentification.user.email}
                </span>
              </Dropdown.Header>
              {authentification.user.role === "admin" && (
                <Dropdown.Item>
                  <Link to="/dashboard">
                    {isEnglish ? "Dashboard" : "لوحة التحكم"}
                  </Link>
                </Dropdown.Item>
              )}
              <Dropdown.Item>
                {isEnglish ? "Profile" : "الملف الشخصي"}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                color="red"
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                }}
              >
                {isEnglish ? "Logout" : "تسجيل الخروج"}
              </Dropdown.Item>
            </Dropdown>
          )}
          {!authentification.isAuthenticated && (
            <Button.Group className="mx-4">
              {location.pathname !== "/login" && (
                <Button
                  color="gray"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <div className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    <span>{isEnglish ? "Login" : "تسجيل الدخول"}</span>
                  </div>
                </Button>
              )}
              {location.pathname !== "/register" && (
                <Button
                  color="gray"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    <span>{isEnglish ? "Register" : "تسجيل"}</span>
                  </div>
                </Button>
              )}
            </Button.Group>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <div className="flex flex-col md:flex-row md:ml-auto gap-5 text-[16px] font-bold">
            <Navbar.Link href="/" active>
              {isEnglish ? "Home" : "الرئيسية"}
            </Navbar.Link>
            <Navbar.Link href="/cars">
              {isEnglish ? "Cars" : "السيارات"}
            </Navbar.Link>
            <Navbar.Link href="#features">
              {isEnglish ? "Services" : "الخدمات"}
            </Navbar.Link>
            <Navbar.Link href="/about">
              {isEnglish ? "About" : "حول"}
            </Navbar.Link>
            <Navbar.Link href="/contact">
              {isEnglish ? "Contact" : "اتصل بنا"}
            </Navbar.Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
