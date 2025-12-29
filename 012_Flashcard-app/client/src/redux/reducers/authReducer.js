const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return { ...state, token: action.payload, isAuthenticated: true, error: null };
    case 'AUTH_FAIL':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...state, token: null, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;