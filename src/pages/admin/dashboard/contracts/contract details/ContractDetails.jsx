import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Fuel,
  KeySquare,
  User,
  Mail,
  Phone,
  DollarSign,
  Car,
  Link2,
  CalendarClock,
  CarFront,
  Component,
} from "lucide-react";
import { useSelector } from "react-redux";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { ExternalLink } from "lucide-react";
import ContractPDF from "../components/contract-attachement-pdf";

export default function ContractDetails() {
  const { id } = useParams();
  const contract = useSelector((state) =>
    state.contracts.find((contract) => contract.id === id)
  );
  const car = useSelector((state) =>
    state.cars.find((car) => car.id === contract.carId)
  );
  const user = useSelector((state) =>
    state.users.find((user) => user.id === contract.userId)
  );

  const navigate = useNavigate();

  if (!contract.id) {
    return (
      <h2 className="text-gray-900 dark:text-gray-100">Contract not found</h2>
    );
  }

  const getStatus = () => {
    const now = new Date();
    const startDate = new Date(contract.startDate);
    const endDate = new Date(contract.endDate);
    now.setHours(0, 0, 0);
    if (now < startDate) return "Upcoming";
    if (now > endDate) return "Completed";
    return "Active";
  };

  const duration = Math.floor(
    (new Date(contract.endDate) - new Date(contract.startDate)) /
      (1000 * 60 * 60 * 24)
  );

  const calculateRentalDays = (startDate, duration) => {
    const days = Math.floor(
      (new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    if (days < 0) return 0;
    if (days > duration) return duration;
    return days;
  };

  const rentalDays = calculateRentalDays(contract.startDate, duration);
  const totalPrice = duration * contract.price;
  const openPdfInNewTab = (blob) => {
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  return (
    <div className="max-w-4xl mx-auto py-2 relative text-gray-900 dark:text-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 my-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
        Back
      </button>

      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg mb-10 p-6">
        {contract && (
          <div className="flex items-center justify-end gap-4">
            <PDFDownloadLink
              document={
                <ContractPDF contract={contract} car={car} user={user} />
              }
              fileName={`contract_${contract.id}.pdf`}
              className="btn btn-primary inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              {({ loading }) => (
                <div className="flex items-center gap-2">
                  {loading ? "Generating PDF..." : "Download Contract as PDF"}
                </div>
              )}
            </PDFDownloadLink>
            <BlobProvider
              document={
                <ContractPDF contract={contract} user={user} car={car} />
              }
            >
              {({ blob, loading }) => (
                <button
                  className="btn btn-primary inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                  disabled={loading}
                  onClick={() => blob && openPdfInNewTab(blob)}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {loading ? "Preparing PDF..." : "Open in New Tab"}
                </button>
              )}
            </BlobProvider>
          </div>
        )}
        {car && user ? (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-4xl font-bold mb-6 text-start">
                Contract Details
              </h1>
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-around my-24">
              <img
                src={user.image}
                alt={user.name}
                className="w-44 h-44 object-cover rounded-full"
              />
              <Link2 className="h-24 w-24 text-[#1a2234] dark:text-gray-100"></Link2>
              <img
                src={car.image}
                alt={car.model}
                className="h-44 aspect-video object-cover rounded-md "
              />
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">
                  <Calendar className="inline-block mr-2" />
                  Progress
                </h2>
                <h2
                  className={`text-xl px-3 py-1 rounded-full font-semibold ${
                    getStatus() === "Upcoming"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : getStatus() === "Completed"
                      ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {getStatus()}
                </h2>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 my-6">
                <div
                  className="bg-blue-600 dark:bg-blue-400 h-4 rounded-full relative"
                  style={{
                    width: `${(rentalDays / duration) * 100}%`,
                  }}
                >
                  <div className={`absolute -right-3 -top-7`}>
                    <Car className="h-8 w-8 text-[#1a2234] dark:text-gray-100"></Car>
                  </div>
                  <div className="inline-block h-full w-16 bg-gradient-to-l from-gray-300 dark:from-gray-600 rounded-full float-end "></div>
                </div>
              </div>
              <p className="text-right mt-2">
                {rentalDays} / {duration} days
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">
                <KeySquare className="inline-block mr-2" />
                Contract Details
              </h2>
              <table className="min-w-full bg-white dark:bg-gray-800">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Contract ID</td>
                    <td className="border px-4 py-2">{contract.id}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <Calendar className="inline-block mr-2" />
                      Start Date
                    </td>
                    <td className="border px-4 py-2">{contract.startDate}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <Calendar className="inline-block mr-2" />
                      End Date
                    </td>
                    <td className="border px-4 py-2">{contract.endDate}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <DollarSign className="inline-block mr-2" />
                      Price
                    </td>
                    <td className="border px-4 py-2">
                      {contract.price} DH / Day
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">
                <User className="inline-block mr-2" />
                User Information
              </h2>
              <table className="min-w-full bg-white dark:bg-gray-800">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Name</td>
                    <td className="border px-4 py-2">{user.name}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <Mail className="inline-block mr-2" />
                      Email
                    </td>
                    <td className="border px-4 py-2">{user.email}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <Phone className="inline-block mr-2" />
                      Phone
                    </td>
                    <td className="border px-4 py-2">{user.phone}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <MapPin className="inline-block mr-2" />
                      Address
                    </td>
                    <td className="border px-4 py-2">{user.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <Car className="inline-block mr-2" />
                Car Information
              </h2>
              <table className="min-w-full bg-white dark:bg-gray-800">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <Component className="inline-block mr-2"></Component>
                      Model
                    </td>
                    <td className="border px-4 py-2">{car.model}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <CarFront className="inline-block mr-2"></CarFront>
                      Brand
                    </td>
                    <td className="border px-4 py-2">{car.name}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <CalendarClock className="inline-block mr-2"></CalendarClock>
                      Year
                    </td>
                    <td className="border px-4 py-2">{car.year}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      <Fuel className="inline-block mr-2" />
                      Fuel Type
                    </td>
                    <td className="border px-4 py-2">{car.type}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4 overflow-hidden rounded-sm shadow-sm text-end">
                <span className="inline-block rounded-s-sm border px-2">
                  Total Price:{" "}
                </span>
                <span className="inline-block rounded-e-sm border px-2">
                  {totalPrice} DH
                </span>
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-lg text-gray-500 dark:text-gray-300">
              Loading contract details...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
