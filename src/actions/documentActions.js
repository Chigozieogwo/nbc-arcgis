import axios from 'axios';
import {
   DOCUMENT_CREATE_REQUEST,
   DOCUMENT_CREATE_SUCCESS,
   DOCUMENT_CREATE_FAIL,
   DOCUMENT_LIST_REQUEST,
   DOCUMENT_LIST_SUCCESS,
   DOCUMENT_LIST_FAIL,
   DOCUMENT_DELETE_FAIL,
   DOCUMENT_DELETE_SUCCESS,
   DOCUMENT_DELETE_REQUEST,
   DOCUMENT_DETAILS_FAIL,
   DOCUMENT_DETAILS_SUCCESS,
   DOCUMENT_DETAILS_REQUEST,
   DOCUMENT_UPDATE_FAIL,
   DOCUMENT_UPDATE_SUCCESS,
   DOCUMENT_UPDATE_REQUEST
} from '../constants/documentConstants';
// import url2 from '../utils/baseUrl.js'

let url = process.env.REACT_APP_BASE_URL;

export const documentCreateAction =
   ( title,descriptionDoc,formData,featureLayerId
   ) =>
   async (dispatch, getState) => {
      try {
         dispatch({ type: DOCUMENT_CREATE_REQUEST });
         const {
            userLogin: { userInfo }
         } = getState();


      
         const config = {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${userInfo.accessToken}`,
           
            }
          };
          

console.log(
   title,descriptionDoc,formData,featureLayerId
    )

          
         const { data } = await axios.post(`${url}/documents/`, { title,descriptionDoc,formData,featureLayerId }, config, {
            
         } );

         dispatch({
            type: DOCUMENT_CREATE_SUCCESS,
            payload: data
         });
      } catch (error) {
         dispatch({
            type: DOCUMENT_CREATE_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message
         });
      }
   };



   export const listDocumentsAction =
   (id) =>
   async (dispatch, getState) => {
      try {
         dispatch({
            type: DOCUMENT_LIST_REQUEST
         });

         const {
            userLogin: { userInfo }
         } = getState();
         
      
         const config = {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${userInfo.accessToken}`,
            
            }
          };
          const { data } = await axios.get(
            `${url}/documents?featureLayerId=${id}`,
            config
         );
    
          console.log(data);
         
         
     

         // console.log(data);

         dispatch({
            type: DOCUMENT_LIST_SUCCESS,
            payload: data
         });
      } catch (error) {
         const message =
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message;
         // if (message === 'Not authorized, token failed') {
         //    dispatch(logout());
         // }
         dispatch({
            type: DOCUMENT_LIST_FAIL,
            payload: message
         });
      }
   };

export const documentDeleteAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: DOCUMENT_DELETE_REQUEST
      });

      const {
         userLogin: { userInfo }
      } = getState();

  
   
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.accessToken}`,
           
         }
       };
       
      await axios.delete(`/api/deposits/${id}`, config);

      dispatch({
         type: DOCUMENT_DELETE_SUCCESS
      });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

      dispatch({
         type: DOCUMENT_DELETE_FAIL,
         payload: message
      });
   }
};

export const documentDetailsAction = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: DOCUMENT_DETAILS_REQUEST });

      const {
         userLogin: { userInfo }
      } = getState();

   
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.accessToken}`,
          
         }
       };
       
      const { data } = await axios.get(`${url}/documents/${id}`, config);

      dispatch({
         type: DOCUMENT_DETAILS_SUCCESS,
         payload: data
      });
      // localStorage.setItem('DEPOSIT_Details', JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: DOCUMENT_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message
      });
   }
};

export const updateDocumentAction = (revenue) => async (dispatch, getState) => {
   try {
      dispatch({
         type: DOCUMENT_UPDATE_REQUEST
      });

      const {
         userLogin: { userInfo }
      } = getState();

      
      
         const config = {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${userInfo.accessToken}`,
            
            }
          };
          
      const { data } = await axios.put(
         `${url}/revenuelines/${revenue.revenueLineCode}`,revenue,  config
      );

      dispatch({
         type: DOCUMENT_UPDATE_SUCCESS,
         payload: data
      });
      dispatch({ type: DOCUMENT_DETAILS_SUCCESS, payload: data });
      console.log(
         data + 'my o my mmmmmmmmmmmmmmmmmmmmmmm'
      );
      console.log(
         JSON.stringify(data + 'my o my') +
            '>>>>>>>>>>>123<<<<<<<<<<<<<<<<<<<<<<<'
      );
      
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

      dispatch({
         type: DOCUMENT_UPDATE_FAIL,
         payload: message
      });
   }
};
