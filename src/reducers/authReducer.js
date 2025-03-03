const storedAuth = JSON.parse(localStorage.getItem("auth")) || {
  isAuthenticated: false,
  user: null,
};

const initialState = {
  isAuthenticated: storedAuth.isAuthenticated || false,
  user: storedAuth.user || null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const { password, ...userWithoutPassword } = action.payload;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: userWithoutPassword,
          isAuthenticated: true,
        })
      );
      return {
        ...state,
        isAuthenticated: true,
        user: userWithoutPassword,
      };
    case "LOGOUT":
      localStorage.removeItem("auth");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
