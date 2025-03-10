import axios from "axios";
const apiURL = import.meta.env.VITE_DATA_API_URL;
let init_state = [
  {
    id: "1",
    name: "John Does",
    email: "johndoe@mail.com",
    phone: "1234567890",
    address: "123 Main St, New York, NY 10030",
    image: "/images/users/client1.jpg",
    role: "client",
    login: "johndoe",
    password: "password123",
    cin: "A123456",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@mail.com",
    phone: "0987654321",
    address: "456 Elm St, Los Angeles, CA 90001",
    image: "/images/users/client2.jpg",
    role: "client",
    login: "janesmith",
    password: "password123",
    cin: "B234567",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alicejohnson@mail.com",
    phone: "5551234567",
    address: "789 Oak St, Chicago, IL 60601",
    image: "/images/users/client3.jpg",
    role: "client",
    login: "alicejohnson",
    password: "password123",
    cin: "C345678",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bobbrown@mail.com",
    phone: "4449876543",
    address: "321 Pine St, Houston, TX 77001",
    image: "/images/users/client4.jpg",
    role: "client",
    login: "bobbrown",
    password: "password123",
    cin: "D456789",
  },
  {
    id: "5",
    name: "mohamed ali",
    email: "mohamedali@mail.com",
    phone: "0345678901",
    address: "agadir ait melloul lamzar",
    image: "/images/users/client5.jpg",
    role: "client",
    login: "mohamedali",
    password: "password123",
    cin: "E567890",
  },
  {
    id: "6",
    name: "alaoui",
    email: "alaoui@mail.com",
    phone: "0123123123",
    address: "lamzar \n",
    image: "/images/users/client6.jpg",
    role: "client",
    login: "alaoui",
    password: "password123",
    cin: "F678901",
  },
  {
    id: "7",
    name: "zakariya",
    email: "zakariya@mail.com",
    phone: "067896789",
    address: "sidi mimoun",
    login: "",
    password: "123456789",
    image: "blob:http://localhost:5173/6557a5b1-6ffb-4e1a-8742-f9b59cb5b3cf",
    role: "client",
    cin: "G789012",
  },
  {
    id: "8",
    name: "abdellah khouden",
    email: "admin@mail.com",
    phone: "234567890°",
    address: "lamzar \n",
    image: "/images/users/client7.png",
    role: "admin",
    login: "admin",
    password: "admin",
    cin: "H890123",
  },
  {
    id: "9",
    name: "John Does",
    email: "brahim@mail.com",
    phone: "0123123123",
    address: "laayoune ",
    image: "",
    role: "client",
    login: "brahim",
    cin: "dsf5678",
    password: "password123",
  },
  {
    id: "10",
    name: "yassine alami",
    email: "yassine@mail.com",
    phone: "0123123123",
    image: "blob:http://localhost:5173/bfd96d5c-fb65-426c-983d-b9e24e767414",
    address: "laayoune ",
    role: "client",
    login: "yassine",
    cin: "Y5678",
    password: "yassineyassine",
  },
  {
    id: "11",
    name: "med",
    email: "mohammedmmmm348@gmail.com",
    phone: "234567890",
    image: "",
    address: "tarrast",
    role: "client",
    login: "med",
    cin: "K567890",
    password: "12345678",
  },
];

export default function usersReducer(state = init_state, action) {
  switch (action.type) {
    case "FETCH_USERS_DATA":
      return action.payload;
    case "ADD_USER":
      return [...state, action.payload];
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);
    case "UPDATE_USER":
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    default:
      return state;
  }
}
