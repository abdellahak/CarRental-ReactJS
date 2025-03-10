import axios from "axios";
const apiURL = import.meta.env.VITE_DATA_API_URL;
let init_state = [
  {
    id: "1",
    name: "Toyota",
    model: "Corolla",
    year: "2023",
    type: "petrol",
    price: "300",
    available: true,
    image: "/images/cars/car1.png",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Honda",
    model: "Civic",
    year: "2016",
    type: "diesel",
    price: "160",
    available: true,
    image: "/images/cars/car2.jpg",
    rating: 4,
  },
  {
    id: "3",
    name: "Suzuki",
    model: "Swift",
    year: "2017",
    type: "petrol",
    price: "140",
    available: false,
    image: "/images/cars/car3.png",
    rating: 3.8,
  },
  {
    id: "4",
    name: "Hyundai",
    model: "Accent",
    year: 2018,
    available: false,
    image: "/images/cars/car4.JPG",
    price: 170,
    type: "diesel",
    rating: 4.2,
  },
  {
    id: "5",
    name: "Kia",
    model: "Rio",
    year: "2019",
    type: "petrol",
    price: "180",
    available: false,
    image: "/images/cars/car5.jpeg",
    rating: 4.1,
  },
  {
    id: "6",
    name: "Fiat",
    model: "Tipo",
    year: "2024",
    type: "petrol",
    price: "180",
    available: true,
    image: "/images/cars/car6.jpg",
    rating: 4.3,
  },
  {
    id: "7",
    name: "Tesla",
    model: "Cyber",
    year: "2020",
    type: "petrol",
    price: "500",
    available: true,
    image: "/images/cars/car7.jpeg",
    rating: 4.7,
  },
  {
    id: "8",
    name: "Chevrolet",
    model: "Malibu",
    year: 2021,
    type: "diesel",
    price: 220,
    available: true,
    image: "/images/cars/car11.jpg",
    rating: 4.4,
  },
  {
    id: "9",
    name: "Nissan",
    model: "Altima",
    year: 2022,
    type: "petrol",
    price: 250,
    available: true,
    image: "/images/cars/car9.jpeg",
    rating: 4.5,
  },
  {
    id: "10",
    name: "BMW",
    model: "X5",
    year: 2023,
    type: "petrol",
    price: 500,
    available: true,
    image: "/images/cars/car8.webp",
    rating: 4.8,
  },
  {
    id: "13",
    name: "Dacia",
    model: "Logan",
    year: "2025",
    type: "petrol",
    price: "400",
    image: "/images/cars/car10.jpg",
    available: true,
    rating: 4,
  },
  {
    id: "14",
    name: "Kia",
    model: "Syros",
    year: "2024",
    type: "petrol",
    price: "400",
    image: "/images/cars/car12.jpg",
    available: true,
    rating: 4.2,
  },
  {
    id: "15",
    name: "Audi",
    model: "RS Q8",
    year: "2024",
    type: "electric",
    price: "730",
    image: "/images/cars/car13.jpg",
    available: true,
    rating: 4.9,
  },
  {
    id: "16",
    name: "Hyundai",
    model: "Creta",
    year: "2024",
    type: "petrol",
    price: "430",
    image: "/images/cars/car14.jpg",
    available: true,
    rating: 4.3,
  },
  {
    id: "17",
    name: "Mahindra",
    model: "XUV700",
    year: "2021",
    type: "petrol",
    price: "600",
    image: "/images/cars/car15.jpg",
    available: true,
    rating: 4.6,
  },
  {
    id: "18",
    name: "Maruti",
    model: "Suzuki",
    year: "2024",
    type: "petrol",
    price: "450",
    image: "/images/cars/car16.jpg",
    available: true,
    rating: 4.4,
  },
  {
    id: "19",
    name: "Toyota",
    model: "Urban",
    year: "2022",
    type: "electric",
    price: "344",
    image: "/images/cars/car17.jpg",
    available: true,
    rating: 4.5,
  },
  {
    id: "20",
    name: "Land Rover",
    model: "Defender",
    year: "2025",
    type: "electric",
    price: "650",
    image: "/images/cars/car18.jpg",
    available: true,
    rating: 4.7,
  },
  {
    id: "21",
    name: "Mahindra",
    model: "Thar",
    year: "2020",
    type: "petrol",
    price: "650",
    image: "/images/cars/car19.jpg",
    available: true,
    rating: 4.6,
  },
];

export default function carsReducer(state = init_state, action) {
  switch (action.type) {
    case "FETCH_CARS_DATA":
      return action.payload;
    case "ADD_CAR":
      return [...state, action.payload];
    case "DELETE_CAR":
      return state.filter((car) => car.id !== action.payload);
    case "UPDATE_CAR":
      return state.map((car) =>
        car.id === action.payload.id ? action.payload : car
      );
    case "RENT_CAR":
      return state.map((car) =>
        car.id === action.payload.id ? { ...car, available: false } : car
      );
    case "RETURN_CAR":
      return state.map((car) =>
        car.id === action.payload.id ? { ...car, available: true } : car
      );
    default:
      return state;
  }
}
