// Actions
export const LOGIN = 'app/auth/LOGIN';
export const LOGOUT = 'app/auth/LOGOUT';

// Initial State
export const initialState = {
  authenticated: false,
  data: {}
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authenticated: true,
        data: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        ...initialState
      };

    default:
      return state;
  }
}

// Action creators

export function login(payload) {
  return {
    type: LOGIN,
    payload
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
