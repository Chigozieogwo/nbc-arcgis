
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_SUPERADMIN_REGISTER_FAIL,
    USER_SUPERADMIN_REGISTER_REQUEST,
    USER_SUPERADMIN_REGISTER_SUCCESS,
    USER_LOGOUT,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    
  

    
    
 } from '../constants/userConstants.js';


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
       case USER_LOGIN_REQUEST:
          return { loading: true };
       case USER_LOGIN_SUCCESS:
          if (action.payload === undefined) {
             action.payload = {};
          }
          return { loading: false, userInfo: action.payload };
       case USER_LOGIN_FAIL:
          return { loading: false, error: action.payload };
       case USER_LOGOUT:
          return {};
       default:
          return state;
    }
};
 
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
       case USER_DETAILS_REQUEST:
          return { ...state, loading: true };
       case USER_DETAILS_SUCCESS:
          if (action.payload === undefined) {
             action.payload = {};
          }
          return { loading: false, user: action.payload };
       case USER_DETAILS_FAIL:
          return { loading: false, error: action.payload };
       case USER_DETAILS_RESET:
          return { user: {} };
       default:
          return state;
    }
 };

 export const userSuperAdminRegisterReducer = (state = {}, action) => {
   switch (action.type) {
     case USER_SUPERADMIN_REGISTER_REQUEST:
       return { loading: true }
     case USER_SUPERADMIN_REGISTER_SUCCESS:
       return { loading: false, userInfo: action.payload }
     case USER_SUPERADMIN_REGISTER_FAIL:
       return { loading: false, error: action.payload }
     case USER_LOGOUT:
       return {}
     default:
       return state
   }
 }


