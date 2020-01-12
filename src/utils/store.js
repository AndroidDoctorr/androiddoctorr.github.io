import { createStore, combineReducers } from 'redux';
import { ninetiesReducer, colorReducer } from './reducers';

const rootReducer = combineReducers({
  isNinetiesMode: ninetiesReducer,
  color: colorReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;
