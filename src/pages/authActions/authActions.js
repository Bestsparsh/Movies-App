import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './actions';

// Mock API login call
const mockLoginAPI = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        resolve({ token: 'your_auth_token_here' });
      } else {
        reject('Invalid credentials');
      }
    }, 1000);
  });
};

// Mock API signup call
const mockSignupAPI = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful signup for any input for this example
      resolve();
    }, 1000);
  });
};

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await mockLoginAPI(username, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.token,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error,
    });
  }
};

export const signup = (username, password) => async (dispatch) => {
  try {
    await mockSignupAPI(username, password);
    dispatch({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error,
    });
  }
};
