import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import movies from './modules/movies';
import actors from './modules/actors';
import nav from './modules/navigation';

const middleware = [
  thunkMiddleware,
];

const reducer = combineReducers({
  actors,
  movies,
  nav,
});

// persistWhitelist is used to define which keys (reducers) to persist
// all other keys (reducers) will be ignored

export default compose(
 applyMiddleware(...middleware),
 global.reduxNativeDevTools ? global.reduxNativeDevTools() : noop => noop,
)(createStore)(reducer);
