import { put, select, takeLatest } from 'redux-saga/effects';
import { register as registerReducer } from 'app/store.reducers';
import { register as registerSaga } from 'app/store.sagas';
import api from 'app/helpers/api';

export function getInitialState() {
  return {
    error: undefined,
    loaded: false,
    loading: false,
    previousUrl: undefined,
    response: undefined,
    time: undefined,
    url: undefined
  };
}

export function getActionTypes(name) {
  return {
    LOAD: `app/${name}/LOAD`,
    LOADING: `app/${name}/LOADING`,
    LOADED: `app/${name}/LOADED`,
    LOAD_FAILED: `app/${name}/LOAD_FAILED`
  };
}

export function getActionCreators(name) {
  return {
    load(url, options = {}) {
      return {
        type: `app/${name}/LOAD`,
        options,
        url
      };
    },

    loading(url) {
      return {
        type: `app/${name}/LOADING`,
        url
      };
    },

    loaded(response) {
      return {
        type: `app/${name}/LOADED`,
        response
      };
    },

    loadFailed(error) {
      return {
        type: `app/${name}/LOAD_FAILED`,
        error
      };
    }
  };
}

export function getReducer(name) {
  const actionTypes = getActionTypes(name);

  return function reducer(state = getInitialState(), action = {}) {
    switch (action.type) {
      case actionTypes.LOADING:
        return {
          ...state,
          loading: true,
          previousUrl: state.url,
          url: action.url
        };

      case actionTypes.LOADED:
        return {
          ...state,
          error: undefined,
          loaded: true,
          loading: false,
          response: action.response,
          time: (new Date()).getTime()
        };

      case actionTypes.LOAD_FAILED:
        return {
          ...state,
          error: action.error,
          loaded: false,
          loading: false
        };

      default:
        return state;
    }
  }
}

export function createModule(name, options = {}) {
  const defaultOptions = {
    // @TODO: Move this data to config files
    maxAge: 300000,
    ...options
  };

  const actionTypes = getActionTypes(name);
  const actionCreators = getActionCreators(name);

  function* loadSaga({ options: loadOptions, url }) {
    const module = yield select(state => state[name]);
    const options = {
      ...defaultOptions,
      ...loadOptions
    };

    if (options.force || !module.time || (new Date()).getTime() - module.time > options.maxAge) {
      try {
        yield put(actionCreators.loading(url));
        const response = yield api.get(url);
        const json = yield response.json();
        yield put(actionCreators.loaded(json));
      } catch (error) {
        yield put(actionCreators.loadFailed(error));
      }
    }
  }

  registerReducer(name, getReducer(name));

  registerSaga(takeLatest(actionTypes.LOAD, loadSaga));
}

export default function storeModule(name) {
  return {
    initialState: () => getInitialState(name),
    actionTypes: () => getActionTypes(name),
    actionCreators: () => getActionCreators(name),
    reducer: () => getReducer(name)
  };
}

storeModule.create = createModule;
