const initialState = {
  language: "en", // Default language
  direction: "ltr",
  font : "outfit"
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH_LANGUAGE":
      return {
        ...state,
        language: action.payload,
        direction: action.payload === "ar" ? "rtl" : "ltr",
        font : action.payload === "ar" ? "cairo" : "outfit"
      };
    default:
      return state;
  }
};

export default languageReducer;
