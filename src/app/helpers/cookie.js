import cookie from 'js-cookie';

export default {
  get(key, config = {}) {
    return cookie.get(key, config);
  },

  remove(key, config = {}) {
    return cookie.set(key, config);
  },

  set(key, value, config = {}) {
    return cookie.set(key, value, config);
  }
};
