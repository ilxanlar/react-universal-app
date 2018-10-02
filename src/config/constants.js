// Env
export const PORT = process.env.PORT || 3000;
export const SERVER = !(typeof window !== 'undefined' && window.document && window.document.createElement);
export const EXPRESS_CACHE_CONTROL_MAX_AGE = process.env.REACT_APP_EXPRESS_CACHE_CONTROL_MAX_AGE;

// API
export const apiRoot = process.env.REACT_APP_API_ROOT || '';

// Auth
export const userTokenCookieName = 'token';

// Site info
export const site = {
  title: 'React Universal App',
  titleSeparator: '|'
};
