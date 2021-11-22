// Testing only
import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from './reducers/index';

// const intialState = {};
// intialState,
// same as - applyMiddleware(thunk,logger)
const middleware = [thunk,logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)) 
);

export default store;