import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";

export default function Register() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const isCinUsed = users.some(user => user.cin === cin);
    const isUserNameUsed = users.some(user => user.userName === userName);
    const isEmailUsed = users.some(user => user.email === email);

    if (isCinUsed) {
      alert("CIN is already used by another user.");
      return;
    }

    if (isUserNameUsed) {
      alert("Username is already used by another user.");
      return;
    }

    if (isEmailUsed) {
      alert("Email is already used by another user.");
      return;
    }

    const nextId = (Math.max(...users.map((user) => user.id)) + 1).toString();
    const userData = {
      id: nextId,
      name,
      email,
      phone,
      address,
      image: image ? image : "",
      role: "client",
      userName,
      cin,
      password,
    };

    try {
      const response = await axios.post(`${apiURL}/users`, userData);
      if (response.status === 201) {
        dispatch({ type: "ADD_USER", payload: response.data });
        console.log("User registered successfully:", response.data);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="cin"
              className="block text-sm font-medium text-gray-700"
            >
              CIN:
            </label>
            <input
              type="text"
              id="cin"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
