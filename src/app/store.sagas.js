import { all } from 'redux-saga/effects';
import appSagas from 'config/store.sagas';

const sagas = [];

export function register(saga) {
  sagas.push(saga);
}

export default function* rootSaga() {
  yield all([
    ...appSagas,
    ...sagas
  ]);
}
