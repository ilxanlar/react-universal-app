import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { loadOnServer, ReduxAsyncConnect } from 'redux-connect';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import Helmet from 'react-helmet';
import createStore from 'app/store';
import getRoutes from 'app/routes';
import resolveInitialPromises from 'app/helpers/initialPromises';
import manifest from '../../build/asset-manifest.json';

const routes = getRoutes();

const extractAssets = (assets, chunks) =>
  Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

const path = require('path');
const fs = require('fs');
const urlManager = require('url');

export default (req, res, next) => {
  const url = req.originalUrl || req.url;
  const location = urlManager.parse(url);
  const htmlFilePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  const { store } = createStore({}, url);

  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end();
    }

    resolveInitialPromises().then(() => {
      loadOnServer({ helpers: {}, location, routes, store }).then(() => {
        const context = {};
        const modules = [];
        const sheet = new ServerStyleSheet();

        store.runSaga.done.then(() => {
          const app = (
            <Loadable.Capture report={m => modules.push(m)}>
              <StyleSheetManager sheet={sheet.instance}>
                <Provider store={store}>
                  <StaticRouter context={context} location={url}>
                    <ReduxAsyncConnect routes={routes} />
                  </StaticRouter>
                </Provider>
              </StyleSheetManager>
            </Loadable.Capture>
          );

          const html = ReactDOMServer.renderToString(app);

          // Handle redirects
          if (context.url) {
            res.header('Location', context.url);
            return res.sendStatus(302);
          }

          const state = JSON.stringify(store.getState());
          const styles = sheet.getStyleTags();
          const helmet = Helmet.renderStatic();
          const headTags = `${helmet.title.toString()} ${helmet.meta.toString()} ${helmet.link.toString()} ${styles}`;
          const extraChunks = extractAssets(manifest, modules).map(
            c => `<script type="text/javascript" src="/${c}"></script>`
          );

          res.send(
            htmlData
              .replace('<meta>', headTags)
              .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
              .replace('__SSR__=0', '__SSR__=1')
              .replace('__REDUX_STATE__={}', `__REDUX_STATE__=${state}`)
              .replace('</body>', `${extraChunks.join('')}</body>`)
          );
        });

        store.close();
      });
    });
  });
};
