import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { ConnectedRouter } from 'connected-react-router';
import getRoutes from './routes';
import createStore from './store';
import Splash from 'components/Common/Splash';
import { RootHelmet } from 'components/Common/Helmet';
import { unregister } from '../registerServiceWorker';
import resolveInitialPromises from 'app/helpers/initialPromises';

const { history, store } = createStore(window.__REDUX_STATE__ || {});

const app = (
  <Provider store={store}>
    <React.Fragment>
      <RootHelmet />

      <ConnectedRouter history={history}>
        <ReduxAsyncConnect routes={getRoutes()} />
      </ConnectedRouter>
    </React.Fragment>
  </Provider>
);

window.onload = () => {
  Loadable.preloadReady().then(() => {
    const rootElement = document.getElementById('root');

    if (window.__SSR__ === 1) {
      ReactDOM.hydrate(app, rootElement);
    } else {
      ReactDOM.render(<Splash />, rootElement);
      resolveInitialPromises().then(() => {
        ReactDOM.hydrate(app, rootElement);
      });
    }
  });
};

unregister();
// registerServiceWorker();
