const init_state = [
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
    default:
      return state;
  }
}
