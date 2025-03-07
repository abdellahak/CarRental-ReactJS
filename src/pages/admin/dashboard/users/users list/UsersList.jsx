import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus, Search, Info, Trash, Trash2, UserPen, User, Mail, Phone, MapPin, MoreVertical } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ConfirmAlert from "@/components/context/ConfirmAlert";

export default function UsersList() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [clientToDelete, setClientToDelete] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const apiURL = import.meta.env.VITE_DATA_API_URL;

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleDeleteClient(id) {
    setAlertMessage(isEnglish ? "Are you sure you want to delete this client?" : "هل أنت متأكد أنك تريد حذف هذا العميل؟");
    setAlertTitle(isEnglish ? "Delete Client" : "حذف العميل");
    setShowAlert(true);
    setClientToDelete(id);
  }
  function deleteClient(id) {
    axios
      .delete(`${apiURL}/users/${id}`)
      .then(() => {
        dispatch({ type: "DELETE_USER", payload: id });
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log(
            isEnglish ? "API not valid or not working, ignoring error and dispatching action." : "واجهة برمجة التطبيقات غير صالحة أو لا تعمل، يتم تجاهل الخطأ وتنفيذ الإجراء."
          );
          dispatch({ type: "DELETE_USER", payload: id });
        } else {
          console.log(err);
        }
      });
  }

  function handleRowClick(id) {
    navigate("/dashboard/users/" + id);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <div className="mb-4 flex justify-between flex-wrap">
        <h2 className="text-2xl font-bold">{isEnglish ? "Users :" : "المستخدمون :"}</h2>
        <Link
          to="/dashboard/users/add"
          className="flex items-center text-center mt-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6 mr-2"></Plus>
          {isEnglish ? "Add User" : "إضافة مستخدم"}
        </Link>
      </div>
      {/* search bar */}
      <div className="py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="relative w-fit">
          <Search className="w-5 h-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="search"
            placeholder={isEnglish ? "Search users..." : "البحث عن المستخدمين..."}
            className="pl-8 pr-4 py-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border-0 bg-white shadow-sm dark:bg-gray-800 dark:text-white"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            value={searchQuery}
          />
        </div>
      </div>
      {/* users */}
      <div id="users" className="overflow-x-auto mt-6">
        <table className="table-auto w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <User className="inline w-4 h-4 mx-1" />
                {isEnglish ? "Name" : "الاسم"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <Mail className="inline w-4 h-4 mx-1" />
                {isEnglish ? "Email" : "البريد الإلكتروني"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <Phone className="inline w-4 h-4 mx-1" />
                {isEnglish ? "Phone" : "الهاتف"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <MapPin className="inline w-4 h-4 mx-1" />
                {isEnglish ? "Address" : "العنوان"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <MoreVertical className="inline w-4 h-4 mx-1" />
                {isEnglish ? "Actions" : "الإجراءات"}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {currentUsers.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => handleRowClick(client.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-2">
                    <img
                      src={client.image || "/images/users/defaultUser.jpg"}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <span>{client.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {client.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {client.phone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {client.address}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/users/edit/${client.id}`);
                      }}
                    >
                      <UserPen className="w-5 h-5"></UserPen>
                    </button>
                    <button
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClient(client.id);
                      }}
                    >
                      <Trash2 className="w-5 h-5"></Trash2>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEnglish ? "Previous" : "السابق"}
          </button>
          <div className="flex gap-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastUser >= filteredUsers.length}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEnglish ? "Next" : "التالي"}
          </button>
        </div>
      </div>
      {showAlert && (
        <ConfirmAlert
          message={alertMessage}
          title={alertTitle}
          onClose={() => setShowAlert(false)}
          onConfirm={() => {
            deleteClient(clientToDelete);
            setShowAlert(false);
            setClientToDelete(null);
          }}
        />
      )}
    </div>
  );
}
