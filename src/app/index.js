import { register as route } from './routes';
import { register as registerInitialPromise } from './helpers/initialPromises';
import { register as registerRouteDataLoader } from './loaders';
import storeModule from './helpers/storeModule';

export default {
  storeModule,
  registerInitialPromise,
  registerRouteDataLoader,
  route,

  // This properties will be assigned during bootstrap
  history: undefined,
  store: undefined
};
