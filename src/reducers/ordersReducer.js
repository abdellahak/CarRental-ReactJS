import axios from "axios";
const apiURL = import.meta.env.VITE_DATA_API_URL;
let init_state = [];

async function fetchData() {
  try {
    const response = await axios.get(`${apiURL}/orders`);
    init_state = response.data;
  } catch (error) {
    init_state = [
      {
        id: "1",
        userId: "1",
        carId: "1",
        startDate: "2025-02-21",
        endDate: "2025-03-31",
        price: 300,
        status: "pending",
      },
      {
        id: "2",
        userId: "2",
        carId: "2",
        startDate: "2025-01-11",
        endDate: "2025-01-30",
        price: 160,
        status: "pending",
      },
      {
        id: "3",
        userId: "3",
        carId: "3",
        startDate: "2025-01-31",
        endDate: "2025-02-21",
        price: 140,
        status: "pending",
      },
      {
        id: "4",
        userId: "4",
        carId: "4",
        startDate: "2025-01-01",
        endDate: "2025-02-30",
        price: 170,
        status: "pending",
      },
    ];
  }
}

await fetchData();

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
