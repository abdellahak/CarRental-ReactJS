import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus, Search, Info, Trash, Trash2, UserPen } from "lucide-react";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

function UsersList() {
  const [searchQuery, setSearchQuery] = useState("");
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

  function deleteClient(id) {
    if (confirm("Are you sure you want to delete this client?")) {
      axios
        .delete(`${apiURL}/users/${id}`)
        .then(() => {
          dispatch({ type: "DELETE_USER", payload: id });
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            console.log("API not valid or not working, ignoring error and dispatching action.");
            dispatch({ type: "DELETE_USER", payload: id });
          } else {
            console.log(err);
          }
        });
    }
  }

  function handleRowClick(id) {
    navigate("/dashboard/users/" + id);
  }

  return (
    <div className="p-4">
      <div className=" mb-4 flex justify-between flex-wrap">
        <h2 className="text-2xl font-bold">Users : </h2>
        <Link
          to="/dashboard/users/add"
          className="flex items-center text-center mt-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6 mr-2"></Plus>
          Add User
        </Link>
      </div>
      {/* search bar */}
      <div className="py-4 border-b">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search cars..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* users */}
      <div id="users" className="overflow-x-auto mt-6">
        <table className="table-auto w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(client.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <img src={client.image} alt="" className="h-10 w-10 rounded-full"/>
                    <span>{client.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {client.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {client.phone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {client.address}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/users/edit/${client.id}`)
                      }}
                    >
                      <UserPen className="w-5 h-5"></UserPen>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClient(client.id);
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
      </div>
    </div>
  );
}

export default UsersList;
