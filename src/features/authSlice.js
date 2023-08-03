// // // authSlice.js
// // import { createSlice } from '@reduxjs/toolkit';

// // const initialState = {
// //   isLogin: false,
// //   formData: {
// //     email: "",
// //     password: "",
// //   },
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     setIsLogin: (state, action) => {
// //       state.isLogin = action.payload;
// //     },
// //     setFormData: (state, action) => {
// //       state.formData = action.payload;
// //     },
// //   },
// // });

// // export const { setIsLogin, setFormData } = authSlice.actions;
// // export default authSlice.reducer;
// // reducers/authReducer.js
// const initialState = {
//   user: null,
//   error: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         user: {
//           username: action.payload.username,
//           token: action.payload.token,
//         },
//         error: null,
//       };
//     case 'LOGIN_FAILURE':
//       return {
//         ...state,
//         user: null,
//         error: action.payload,
//       };
//     case 'LOGOUT':
//       return initialState;
//     default:
//       return state;
//   }
// };

// export default authReducer;
import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../pages/authActions/actions';

const initialState = {
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
