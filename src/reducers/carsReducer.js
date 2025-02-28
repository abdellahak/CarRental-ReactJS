import axios from "axios";
const apiURL = import.meta.env.VITE_DATA_API_URL;
let init_state = [];

async function fetchData() {
  try {
    const response = await axios.get(`${apiURL}/cars`);
    init_state = response.data;
  } catch (error) {
    init_state = [
      {
        id: "1",
        name: "Toyota",
        model: "Corolla",
        year: "2023",
        type: "petrol",
        price: "300",
        available: true,
        image: "/images/cars/car1.png",
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
      },
      {
        id: "6",
        name: "Fiat",
        model: "Tipo",
        year: "2024",
        type: "petrol",
        price: "180",
        available: true,
        image: "/images/cars/car6.jpg  ",
      },
      {
        id: "7",
        name: "Cyber",
        model: "Tesla",
        year: "2020",
        type: "petrol",
        price: "500",
        available: true,
        image: "/images/cars/car7.jpeg",
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
      },
      {
        id: "13",
        name: "logan",
        model: "dacia",
        year: "2025",
        type: "petrol",
        price: "400",
        image: "/images/cars/car10.jpg",
        available: true,
      },
      {
        id: "14",
        name: "Syros",
        model: "Kia",
        year: "2024",
        type: "petrol",
        price: "400",
        image: "/images/cars/car12.jpg",
        available: true,
      },
      {
        id: "15",
        name: "RS Q8",
        model: "Audi",
        year: "2024",
        type: "electric",
        price: "730",
        image: "/images/cars/car13.jpg",
        available: true,
      },
    ];
  }
}

await fetchData();

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
