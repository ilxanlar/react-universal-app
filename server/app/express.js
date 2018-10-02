import path from 'path';
import express from 'express';
import Loadable from 'react-loadable';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { EXPRESS_CACHE_CONTROL_MAX_AGE, PORT } from 'config/constants';
import serverRenderer from './render';

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

router.use('^/$', serverRenderer);

router.use(express.static(path.resolve(__dirname, '..', '..', 'build'), { maxAge: EXPRESS_CACHE_CONTROL_MAX_AGE }));

// Add your custom routes here

router.use('*', serverRenderer);

app.use(router);

Loadable.preloadAll().then(() => {
  app.listen(PORT, error => {
    if (error) {
      return console.log('something bad happened', error);
    }

    console.log('listening on ' + PORT + '...');
  });
});
