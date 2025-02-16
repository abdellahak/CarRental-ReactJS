const init_state = [
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
