import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import appReducers from 'config/store.reducers';

const reducers = {
  reduxAsyncConnect
};

export function register(name, reducer, override = false) {
  if (reducers[name] && !override) {
    console.warn(`There is already a reducer named "${name}". If you really want to replace it, pass the third parameter boolean true.`);
  } else {
    reducers[name] = reducer;
  }
}

export default function getReducers() {
  return combineReducers({
    ...appReducers,
    ...reducers
  });
}
