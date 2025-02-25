import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import carsReducer from './reducers/carsReducer.js';
import usersReducer from './reducers/usersReducer.js';
import contractsReducer from './reducers/contractsReducer.js';
import authReducer from './reducers/authReducer.js';
import {createStore, combineReducers} from 'redux';

const store = createStore(combineReducers({cars : carsReducer, users : usersReducer, contracts : contractsReducer , auth : authReducer}));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
