import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import portfolioReducer from './reducers/portfolioReducer';
import priceReducer from './reducers/priceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  portfolio: portfolioReducer,
  price: priceReducer,
});

const initialState = {
  auth: { token: localStorage.getItem('token') || null },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;