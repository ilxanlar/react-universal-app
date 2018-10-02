import app from 'app';

const actionCreators = app.storeModule('repositories').actionCreators();

export const load = actionCreators.load;

export function asyncLoad({ store }) {
  return store.dispatch(load('/repositories'));
}
