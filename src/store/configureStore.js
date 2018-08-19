import rootReducer from '../reducers';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const configureStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};

export default configureStore;
