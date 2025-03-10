import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Users,
  Settings,
  Fuel,
  Gauge,
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import InfoAlert from "@/components/context/InfoAlert";
import { DatePicker } from "@/components/context/DatePicker";
import { DateRangePicker } from "@/pages/admin/dashboard/statistics/components/date-range-picker";
import Calendar from "./components/Calendar";
import DangerAlert from "@/components/context/DangerAlert";
import { generateInvoicePDF } from "./OrderFacture";
import axios from "axios";

export default function RentCar() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders);
  const cars = useSelector((state) => state.cars);
  const car = cars.find((car) => car.id === id);
  const contracts = useSelector((state) => state.contracts);
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const carContracts = contracts.filter((contract) => contract.carId === id);
  const carBookedDates = carContracts.map((contract) => ({
    start: contract.startDate,
    end: contract.endDate,
  }));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alert, setAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [invoiceUrl, setInvoiceUrl] = useState("");
  const navigate = useNavigate();

  const isDateOverlap = (start1, end1, start2, end2) => {
    return (
      new Date(start1) <= new Date(end2) && new Date(end1) >= new Date(start2)
    );
  };

  const addOrder = (order) => {
    const nextId = (
      Math.max(...orders.map((order) => parseInt(order.id))) + 1
    ).toString();
    axios
      .post(`${apiURL}/orders`, { ...order, id: nextId })
      .then(() => {
        dispatch({
          type: "ADD_ORDER",
          payload: { ...order, id: nextId },
        });
        generateInvoice(nextId);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log(
            isEnglish
              ? "API not valid or not working, ignoring error and dispatching action."
              : "واجهة برمجة التطبيقات غير صالحة أو لا تعمل، يتم تجاهل الخطأ وتنفيذ الإجراء."
          );
          dispatch({
            type: "ADD_ORDER",
            payload: { ...order, id: nextId },
          });
          generateInvoice(nextId);
        } else {
          console.log(err);
        }
      });
  };

  const calculateTotalPrice = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalPrice(diffDays * car.price);
  };

  useEffect(() => {
    if (startDate && endDate) {
      calculateTotalPrice(startDate, endDate);
    }
  }, [startDate, endDate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      setDangerAlert(
        isEnglish
          ? "Please login to reserve a car"
          : "يرجى تسجيل الدخول لحجز سيارة"
      );
      return;
    }
    const today = new Date();
    if (new Date(startDate) <= today) {
      setDangerAlert(
        isEnglish
          ? "The start date should be greater than today"
          : "يجب أن يكون تاريخ البدء أكبر من اليوم"
      );
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setDangerAlert(
        isEnglish
          ? "The end date should be greater than the start date"
          : "يجب أن يكون تاريخ الانتهاء أكبر من تاريخ البدء"
      );
      return;
    }

    if (!startDate || !endDate) {
      setDangerAlert(
        isEnglish ? "Please fill in all fields" : "يرجى ملء جميع الحقول"
      );
      return;
    }

    const isOverlap = carBookedDates.some((booked) =>
      isDateOverlap(startDate, endDate, booked.start, booked.end)
    );

    if (isOverlap) {
      setDangerAlert(
        isEnglish
          ? "The car is already reserved for this period"
          : "السيارة محجوزة بالفعل لهذه الفترة"
      );
      return;
    }
    const order = {
      userId: user.id,
      carId: id,
      startDate: new Date(startDate).toISOString().split("T")[0],
      endDate: new Date(endDate).toISOString().split("T")[0],
      price: car.price,
      status: "pending",
    };
    const nextId = (
      Math.max(...orders.map((order) => parseInt(order.id))) + 1
    ).toString();
    addOrder({ ...order, id: nextId });
    sendEmail();
    setAlert(isEnglish ? "Car reserved successfully" : "تم حجز السيارة بنجاح");
  }

  function sendEmail() {
    emailjs.send(
      "service_nc8s3il",
      "template_bgkwtgh",
      {
        to_name: user.name,
        from_name: "Mingo Cars",
        message: `Congratulations you have reserved your car ${car.model} ${car.name} successfully`,
        reply_to: user.email,
        email: user.email,
      },
      { publicKey: "OvJKWrIx6UW3XbnQa" }
    );
  }

  const handleWhatsAppOrder = () => {
    const message = isEnglish
      ? `I would like to order the car ${car.name} ${car.model} from ${startDate} to ${endDate}.`
      : `أود طلب السيارة ${car.name} ${car.model} من ${startDate} إلى ${endDate}.`;
    const whatsappUrl = `https://wa.me/212762377545?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const generateInvoice = (orderId) => {
    if (!user || !car) return;

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const diffTime = Math.abs(endDateObj - startDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const invoiceData = {
      invoiceNumber: `INV-${orderId}`,
      customerName: user.name,
      customerEmail: user.email,
      carName: car.name,
      carModel: car.model,
      startDate: new Date(startDate).toLocaleDateString(),
      endDate: new Date(endDate).toLocaleDateString(),
      pricePerDay: car.price,
      totalPrice: totalPrice,
      companyName: "Mingo Cars",
      companyAddress: "123 Car Rental St., Agadir, Morocco",
      companyPhone: "+212 680 696 199",
      companyEmail: "info@mingocars.com",
      companyLogo: "/images/logo/mingo cars logo.png", // Assuming you have a logo
    };

    const pdfDataUrl = generateInvoicePDF(invoiceData);
    setInvoiceUrl(pdfDataUrl);

    // Open the PDF in a new tab
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(
        `<iframe width="100%" height="100%" src="${pdfDataUrl}"></iframe>`
      );
    }
  };

  return (
    <>
      <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {user && (
            <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center space-x-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {isEnglish ? "User Information" : "معلومات المستخدم"}
                </h2>
                <p className="text-gray-900 dark:text-gray-100">
                  {isEnglish ? "Name:" : "الاسم:"} {user.name}
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {isEnglish ? "Email:" : "البريد الإلكتروني:"} {user.email}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-600 my-6 cursor-pointer"
          >
            {isEnglish ? (
              <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
            ) : (
              <ArrowRight className="w-4 h-4 mr-2"></ArrowRight>
            )}
            {isEnglish ? "Back" : "رجوع"}
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {car.name} {car.model}
                </h1>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={car.image}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="text-brand-600 dark:text-brand-400" />
                    <span className="text-gray-900 dark:text-gray-100">
                      {car.year}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="text-brand-600 dark:text-brand-400" />
                    <span className="text-gray-900 dark:text-gray-100">
                      {car.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg h-full flex flex-col justify-between">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    {isEnglish ? "Rental Information" : "معلومات الإيجار"}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {isEnglish ? "Pick-up Date" : "تاريخ الاستلام"}
                      </label>
                      <div className="mt-1">
                        <DatePicker
                          selectedDate={startDate}
                          setSelectedDate={setStartDate}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {isEnglish ? "Return Date" : "تاريخ العودة"}
                      </label>
                      <div className="mt-1 relative">
                        <DatePicker
                          selectedDate={endDate}
                          setSelectedDate={setEndDate}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                        {car.price || 100} {isEnglish ? "MAD/day" : "درهم/يوم"}
                      </p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {isEnglish ? "Total Price:" : "السعر الإجمالي:"}{" "}
                        {totalPrice} {isEnglish ? "MAD" : "درهم"}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-brand-600 dark:bg-brand-500 text-white py-3 px-4 rounded-md hover:bg-brand-700 dark:hover:bg-brand-600 transition duration-300 cursor-pointer"
                      >
                        {isEnglish ? "Reserve Now" : "احجز الآن"}
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsAppOrder}
                        className="w-full bg-green-600 dark:bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition duration-300 cursor-pointer"
                      >
                        {isEnglish ? "Order from WhatsApp" : "اطلب من واتساب"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="mt-8 p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {isEnglish ? "Unavailable Dates" : "التواريخ غير المتاحة"}
              </h2>
              <div className="mb-4">
                <span className="inline-block w-4 h-4 bg-red-500/70 rounded-full mr-2"></span>
                <span className="text-gray-900 dark:text-gray-100">
                  {isEnglish ? "Reserved Days" : "الأيام المحجوزة"}
                </span>
              </div>
              <div className="mb-4">
                <span className="inline-block w-4 h-4  border border-black dark:border-white rounded-full mr-2"></span>
                <span className="text-gray-900 dark:text-gray-100">
                  {isEnglish ? "Available Days" : "الأيام المتاحة"}
                </span>
              </div>
              <Calendar events={carBookedDates} />
            </div>
          </div>
        </div>
        {alert && (
          <InfoAlert
            message={alert}
            setMessage={setAlert}
            onClose={() => setAlert(false)}
          />
        )}
        {dangerAlert && (
          <DangerAlert
            message={dangerAlert}
            setMessage={setDangerAlert}
            onClose={() => {
              if (!user) {
                navigate("/login");
              }
              setDangerAlert(false);
            }}
          />
        )}
      </div>
    </>
  );
}
