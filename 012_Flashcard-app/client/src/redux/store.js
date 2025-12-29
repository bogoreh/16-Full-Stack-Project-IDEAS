import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from './reducers/authReducer';
import deckReducer from './reducers/deckReducer';
import cardReducer from './reducers/cardReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  deck: deckReducer,
  card: cardReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;