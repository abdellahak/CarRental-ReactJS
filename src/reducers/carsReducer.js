import axios from "axios";
const apiURL = import.meta.env.VITE_DATA_API_URL;
let init_state = [];



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
