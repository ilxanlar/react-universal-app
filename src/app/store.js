import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import app from 'app';
import { SERVER } from 'config/constants';
import getReducers from './store.reducers';
import rootSaga from './store.sagas';

function createHistory(initialUrl = undefined) {
  if (SERVER) {
    return createMemoryHistory({
      initialEntries: [initialUrl],
      initialIndex: 0
    });
  }

  return createBrowserHistory();
}

export default (initialState = undefined, initialUrl = undefined) => {
  const history = createHistory(initialUrl);
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(history);
  const middleWares = [applyMiddleware(sagaMiddleware, routerMiddleware)];

  if (!SERVER && window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleWares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  app.store = createStore(
    connectRouter(history)(getReducers()),
    initialState,
    compose(...middleWares)
  );

  app.store.close = () => app.store.dispatch(END);
  app.store.runSaga = sagaMiddleware.run(rootSaga);

  return {
    history,
    store: app.store
  };
};
