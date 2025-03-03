import { useState } from "react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import DarkModeToggle from "../context/DarkModeToggle";
import LanguageToggle from "../context/LanguageToggle";
import { UserPlus, LogIn } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ConfirmAlert from "../context/ConfirmAlert";

export default function Header() {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const authentification = useSelector((state) => state.auth);
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
    <div dir="ltr" className="bg-white border-gray-200 dark:border-gray-700 dark:bg-gray-900 lg:border-b fixed top-0 left-0 right-0 z-50">
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
                onClick={handleLogout}
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
          <Navbar.Toggle className="mx-2" />
        </div>
        <Navbar.Collapse>
          <div dir={isEnglish ? "ltr" : "rtl"} className="flex flex-col md:flex-row md:ml-auto gap-5 text-[16px] font-bold">
            <Link
              to="/"
              className={`${(location.hash === "#hero" || location.pathname === "/") && location.hash !== "#features" ? "dark:text-white text-brand-700" : "text-gray-700 dark:text-gray-400"} dark:hover:text-white hover:text-brand-700`}
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate("/", { replace: true });
                }
              }}
            >
              {isEnglish ? "Home" : "الرئيسية"}
            </Link>
            <Link to="/cars" className={`${location.pathname === "/cars" ? "dark:text-white text-gray-900" : "text-gray-700 dark:text-gray-400"} dark:hover:text-white hover:text-brand-700`}>
              {isEnglish ? "Cars" : "السيارات"}
            </Link>
            <Link to="/#features" onClick={handleScrollToFeatures} className={`${location.hash === "#features" ? "dark:text-white text-brand-700" : "text-gray-700 dark:text-gray-400"} dark:hover:text-white hover:text-brand-700`}>
              {isEnglish ? "Services" : "الخدمات"}
            </Link>
            <Link to="/about" className={`${location.pathname === "/about" ? "dark:text-white text-brand-700" : "text-gray-700 dark:text-gray-400"} dark:hover:text-white hover:text-brand-700`}>
            {isEnglish ? "About" : "حول"}
            </Link>
            <Link to="/contact" className={`${location.pathname === "/contact" ? "dark:text-white text-brand-700" : "text-gray-700 dark:text-gray-400"} dark:hover:text-white hover:text-brand-700`}>
            {isEnglish ? "Contact" : "اتصل بنا"}
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
      {showConfirmAlert && (
        <ConfirmAlert
          onClose={handleCloseAlert}
          onConfirm={handleConfirmLogout}
          title={isEnglish ? "Confirm Logout" : "تأكيد تسجيل الخروج"}
          message={isEnglish ? "Are you sure you want to logout?" : "هل أنت متأكد أنك تريد تسجيل الخروج؟"}
        />
      )}
    </div>
  );
}
