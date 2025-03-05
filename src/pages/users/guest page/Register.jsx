import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { FileInput } from "flowbite-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Register() {
  const language = useSelector((state) => state.language.language);
  const isEnglish = language === "en";
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
      alert("Password must be at least 8 characters long. كلمة المرور يجب أن تكون على الأقل 8 أحرف.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. كلمات المرور غير متطابقة.");
      return;
    }

    const isCinUsed = users.some(user => user.cin === cin);
    const isUserNameUsed = users.some(user => user.userName === userName);
    const isEmailUsed = users.some(user => user.email === email);

    if (isCinUsed) {
      alert("CIN is already used by another user. رقم الهوية مستخدم بالفعل من قبل مستخدم آخر.");
      return;
    }

    if (isUserNameUsed) {
      alert("Username is already used by another user. اسم المستخدم مستخدم بالفعل من قبل مستخدم آخر.");
      return;
    }

    if (isEmailUsed) {
      alert("Email is already used by another user. البريد الإلكتروني مستخدم بالفعل من قبل مستخدم آخر.");
      return;
    }

    const nextId = (Math.max(...users.map((user) => user.id)) + 1).toString();
    let image = "";
    if (e.currentTarget.image.files && e.currentTarget.image.files[0]) {
      image = URL.createObjectURL(e.currentTarget.image.files[0]);
    }
    const userData = {
      id: nextId,
      name,
      email,
      phone,
      image,
      address,
      role: "client",
      login : userName,
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 mb-12 mt-24">
      <div className="w-full max-w-[584px] p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
          {isEnglish ? "Register" : "تسجيل"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="space-y-1">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Username:" : "اسم المستخدم:"}
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={isEnglish ? "Enter your username" : "أدخل اسم المستخدم"}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="cin"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "CIN:" : "رقم الهوية:"}
            </label>
            <input
              type="text"
              id="cin"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              placeholder={isEnglish ? "Enter your CIN" : "أدخل رقم الهوية"}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Full Name:" : "الاسم الكامل:"}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isEnglish ? "Enter your full name" : "أدخل اسمك الكامل"}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Email:" : "البريد الإلكتروني:"}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEnglish ? "Enter your email" : "أدخل بريدك الإلكتروني"}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Phone:" : "رقم الهاتف:"}
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isEnglish ? "Enter your phone number" : "أدخل رقم هاتفك"}
              required
              className={` ${isEnglish&& "text-end"}w-full text-end px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-100`}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Address:" : "العنوان:"}
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={isEnglish ? "Enter your address" : "أدخل عنوانك"}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1 col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Image:" : "صورة:"}
            </label>
            <Input id="file-upload" type="file" className="border border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-gray-100"/>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Password:" : "كلمة المرور:"}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEnglish ? "Enter your password" : "أدخل كلمة المرور"}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {isEnglish ? "Confirm Password:" : "تأكيد كلمة المرور:"}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={isEnglish ? "Confirm your password" : "أكد كلمة المرور"}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full col-span-2 px-4 py-2 text-white bg-brand-600 rounded-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 cursor-pointer"
          >
            {isEnglish ? "Register" : "تسجيل"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {isEnglish ? "Have an account?" : "هل لديك حساب؟"} <Link to="/login" className="text-brand-600 hover:text-brand-500">{isEnglish ? "Login" : "تسجيل الدخول"}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
