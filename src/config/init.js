import app from 'app';
import { login } from 'store/auth';
import { asyncLoad as asyncLoadRepositories } from 'store/repositories';

app.storeModule.create('repositories');

app.registerInitialPromise(() => {
  return app.store.dispatch(login({
    id: 1,
    email: 'example@gmail.com',
    displayName: 'ilxanlar'
  }));
});

app.registerRouteDataLoader('home', [asyncLoadRepositories]);
