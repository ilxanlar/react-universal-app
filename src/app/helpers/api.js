import fetch from 'isomorphic-fetch';
import { apiRoot } from 'config/constants';

function formatApiUrl(path) {
  return /^http/.test(path) ?
    path : `${apiRoot}${path[0] !== '/' ? '/' + path : path}`;
}

function checkStatus(response) {
  return response.status >= 200 && response.status < 300 ?
    response : response.json().then(json => Promise.reject(json));
}

// function parseJSON(response) {
//   const contentType = response.headers.get('Content-type');
//   return contentType === 'application/json' ? response.json() : response;
// }

function handleFailure(error) {
  return Promise.reject(error);
}

function fetchCreator(method) {
  return function (url, data, options = {}) {
    options.headers = options.headers || {};
    options.headers.Accept = 'application/json';

    if (data) {
      if (options.type === 'formData') {
        options.body = new FormData();

        for (let key in data) {
          if (typeof key === 'string' && data.hasOwnProperty(key) && typeof data[key] !== 'undefined') {
            options.body.append(key, data[key]);
          }
        }
      } else {
        options.body = JSON.stringify(data);
        options.headers['Content-Type'] = 'application/json';
      }
    }

    options.method = method;

    return fetch(formatApiUrl(url), options)
      .then(checkStatus)
      .catch(handleFailure);
  }
}

export default {
  delete: fetchCreator('delete'),
  get: fetchCreator('get'),
  patch: fetchCreator('patch'),
  post: fetchCreator('post'),
  put: fetchCreator('put')
};
