const init_state = [];

export default function contractsReducer(state = init_state, action){
  switch(action.type){
    case 'FETCH_CONTRACTS_DATA':
      return action.payload;
    case 'ADD_CONTRACT':
      return [...state, action.payload];
    case 'DELETE_CONTRACT':
      return state.filter(contract => contract.id !== action.payload);
    case 'UPDATE_CONTRACT':
      return state.map(contract => contract.id === action.payload.id ? action.payload : contract);
    default : 
      return state;
  }
}
