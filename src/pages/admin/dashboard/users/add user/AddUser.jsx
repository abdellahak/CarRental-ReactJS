import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, Save, X , Mail, User, Phone, MapPin, Lock, Image} from "lucide-react";
import axios from "axios";

export default function AddUser() {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_DATA_API_URL;
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    login: "",
    password: "",
  });
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  function handleSubmit(e) {
    e.preventDefault();

    // Validate input
    if (!user.name || !user.email || !user.phone || !user.address) {
      alert("All fields are required.");
      return;
    }

    const nextId = Math.max(...users.map((c) => parseInt(c.id))) + 1;
    let image = "/images/users/defaultUser.jpg";
    if (e.currentTarget.image.files && e.currentTarget.image.files[0]) {
      image = URL.createObjectURL(e.currentTarget.image.files[0]);
    }
    const data = { ...user, id: nextId.toString(), image: image , role : "client"};
    
    // Send data to the server
    axios.post(`${apiURL}/users`, data)
    .then(()=>{
      dispatch({ type: "ADD_USER", payload: data });
      navigate("/dashboard/users");
    })
    .catch((err) => {
      if (err.code === "ERR_NETWORK") {
        console.log(
          "API not valid or not working, ignoring error and dispatching action."
        );
        dispatch({ type: "ADD_USER", payload: data });
        navigate("/dashboard/users");
      } else {
        console.log(err);
      }
    });
  }
  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 my-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2"></ArrowLeft>
          Back
        </button>
        <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-10 p-6">
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold mb-6">Add New User</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                
                <User   className="h-5 w-5 text-gray-400 absolute top-9 left-3"></User>
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value = {user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Mail className="h-5 w-5 text-gray-400 absolute top-9 left-3"></Mail>
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value = {user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <Lock className="h-5 w-5 text-gray-400 absolute top-9 left-3"></Lock>
              </div>
              <div className="relative">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value = {user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
                
                <Phone className="h-5 w-5 text-gray-400 absolute top-9 left-3"></Phone>
              </div>
              <div className="relative">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Image className="h-5 w-5 text-gray-400 absolute top-9 left-3"></Image>
              </div>
              <div className="md:col-span-2 relative">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4   py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                ></textarea>
                <MapPin className="h-5 w-5 text-gray-400 absolute top-9 left-3"></MapPin>
              </div>
            </div>
            {/* submit button */}
            <div className="flex justify-end pt-4 gap-2 flex-wrap">
              <button
                type="button"
                className="text-black border flex-1 sm:flex-none border-blue-600 px-6 py-2 rounded-lg transition-colors flex items-center cursor-pointer"
                onClick={() => navigate("/dashboard/users")}
              >
                <X className="w-5 h-5 mr-2"></X>
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 flex-1 sm:flex-none text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-nowrap cursor-pointer"
              >
                <Save className="w-5 h-5 mr-2"></Save>
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
