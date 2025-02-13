
const init_state = [];

export default function carsReducer(state = init_state, action){
  switch(action.type){
    case 'FETCH_CARS_DATA':
      return action.payload;
    case 'ADD_CAR':
      return [...state, action.payload];
    case 'DELETE_CAR':
      return state.filter(car => car.id !== action.payload);
    case 'UPDATE_CAR':
      return state.map(car => car.id === action.payload.id ? action.payload : car);
    default : 
      return state;
  }
}