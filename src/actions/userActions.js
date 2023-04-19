import axios from 'axios';
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


 let url = process.env.REACT_APP_BASE_URL;
 let secret = process.env.SECRET;



export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST
      });

      const config = {
         headers: {
              'Content-Type': 'application/json',
           
         }
      };

    
      const { data } = await axios.post(`${url}/users/login`,
       { email, password },
       config);
     

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

      
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message
      });
   }
};


export const getUserDetails = () => async (dispatch, getState) => {
    try {
       dispatch({
          type: USER_DETAILS_REQUEST
       });
 
       const { userLogin: { userInfo }} = getState();
    

        console.log(userInfo.firstName + " Action userinfo")
        console.log(userInfo.lastName + " Action userinfo")
       

       const config = {
          headers: {
             Authorization: `Bearer ${userInfo.accessToken}`
          }
       };
        
        
       const { data } = await axios.get(`${url}/users/myprofile`, config);
    
       dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: data
       });
    } catch (error) {
       const message =
          error.response && error.response.data.message
             ? error.response.data.message
             : error.message;
       if (message === 'Not authorized, token failed') {
          dispatch(logout());
       }
       dispatch({
          type: USER_DETAILS_FAIL,
          payload: message
       });
    }
 };


 export const registerSuperAdmin = (firstName, lastName,email,password) => async (dispatch) => {
   try {
     dispatch({
       type: USER_SUPERADMIN_REGISTER_REQUEST,
     })
 
     const config = {
       headers: {
           'Content-Type': 'application/json',
           'secret': `${secret}`
       },
     }
 
     const { data } = await axios.post(
      `${url}/users/superadmin`,
       { firstName,lastName,email,password},
       config
     )
 
     dispatch({
       type: USER_SUPERADMIN_REGISTER_SUCCESS,
       payload: data,
     })
 
   //   dispatch({
   //     type: USER_LOGIN_SUCCESS,
   //     payload: data,
   //   })
 
   //   localStorage.setItem('userInfo', JSON.stringify(data))
   } catch (error) {
     dispatch({
       type: USER_SUPERADMIN_REGISTER_FAIL,
       payload:
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message,
     })
   }
}
 


 

 export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    
 
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
 
    // dispatch({ type: USER_LIST_RESET });
    document.location.href = '/';
 };