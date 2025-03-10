import axios from "axios";
const apiURL = import.meta.env.VITE_DATA_API_URL;
let init_state = [];

export default function ordersReducer(state = init_state, action) {
  switch (action.type) {
    case "FETCH_ORDERS_DATA":
      return action.payload;
    case "ADD_ORDER":
      return [...state, action.payload];
    case "DELETE_ORDER":
      return state.filter((order) => order.id !== action.payload);
    case "UPDATE_ORDER":
      return state.map((order) =>
        order.id === action.payload.id ? action.payload : order
      );
    default:
      return state;
  }
}
