
import {
    FEATURE_LAYER_DETAILS_FAIL,
    FEATURE_LAYER_DETAILS_REQUEST,
    FEATURE_LAYER_DETAILS_SUCCESS,
   FEATURE_LAYER_DETAILS_RESET,
    FEATURE_LAYER_UPDATE_FAIL,
    FEATURE_LAYER_UPDATE_REQUEST,
    FEATURE_LAYER_UPDATE_SUCCESS,
   FEATURE_LAYER_UPDATE_RESET,
   FEATURE_LAYER_CREATE_FAIL,
   FEATURE_LAYER_CREATE_REQUEST,
   FEATURE_LAYER_CREATE_SUCCESS,
    LIST_FEATURE_LAYER_FAIL,
    LIST_FEATURE_LAYER_REQUEST,
    LIST_FEATURE_LAYER_SUCCESS,
    LIST_FEATURE_LAYER_RESET,
    ADD_LAYER_TO_MAP_FAIL,
    ADD_LAYER_TO_MAP_REQUEST,
    ADD_LAYER_TO_MAP_SUCCESS,
    ADD_LAYER_TO_MAP_RESET,
 } from '../constants/featureLayerConstants.js';
 import axios from 'axios';


 let url = process.env.REACT_APP_BASE_URL;


//  export function addLayerToMap(layer) {
//     return (dispatch, getState) => {
//       const { view } = getState().map;
//       view.when(() => {
//         view.map.add(layer);
//         dispatch({
//           type: ADD_LAYER_TO_MAP,
//           payload: { layer }
//         });
//       });
//     };
//   }


export const featureLayerCreateAction =
   ( name,
      featureCategorization,
      description,
      parentFeatureLayerId,
      geometry
   ) =>
   async (dispatch, getState) => {
      try {
         dispatch({ type: FEATURE_LAYER_CREATE_REQUEST });
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
   name,
          featureCategorization,
   description,
   parentFeatureLayerId,
   geometry
    )

          
         const { data } = await axios.post(
            `${url}/featurelayers/`,
            {
               name,
               featureCategorization,
               description,
               parentFeatureLayerId,
               geometry
            },
            config
         );

         dispatch({
            type: FEATURE_LAYER_CREATE_SUCCESS,
            payload: data
         });
      } catch (error) {
         dispatch({
            type: FEATURE_LAYER_CREATE_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message
         });
      }
   };


  export const featureLayerDetailsAction = (layer) => async (dispatch, getState) => {
    try {
       dispatch({ type: FEATURE_LAYER_DETAILS_REQUEST });
 
       const {
          userLogin: { userInfo }
       } = getState();
 
    
       const config = {
          headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${userInfo.accessToken}`,

             
          }
        };
        
       const { data } = await axios.get(`${url}/featurelayers/r/${layer}`, config);
 
       dispatch({
          type: FEATURE_LAYER_DETAILS_SUCCESS,
          payload: data
       });
       console.log(data + "-----------------------------")
       // localStorage.setItem('DEPOSIT_Details', JSON.stringify(data));
    } catch (error) {
       dispatch({
          type: FEATURE_LAYER_DETAILS_FAIL,
          payload:
             error.response && error.response.data.message
                ? error.response.data.message
                : error.message
       });
    }
 };







export const addLayerToMapAction =
   (layer) =>
   async (dispatch, getState) => {
      try {
         dispatch({ type: ADD_LAYER_TO_MAP_REQUEST });
         const {
            userLogin: { userInfo }
         } = getState();

      
         const config = {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${userInfo.accessToken}`,
            //    'tenantId': `${tenant?.singleTenant?._id}`
            }
          };
          

console.log( layer)

          
         const { data } = await axios.post(
            `${url}/featurelayers`, {layer},
            config
         );

         dispatch({
            type: ADD_LAYER_TO_MAP_SUCCESS,
            payload: data
         });
      } catch (error) {
         dispatch({
            type: ADD_LAYER_TO_MAP_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message
         });
      }
   };


   
export const listFeatureLayerAction =
() =>
async (dispatch, getState) => {
   try {
      dispatch({
         type: LIST_FEATURE_LAYER_REQUEST
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
        `${url}/featurelayers/r/`,
        config
     );

      console.log(data);

      dispatch({
         type: LIST_FEATURE_LAYER_SUCCESS,
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
         type: LIST_FEATURE_LAYER_FAIL,
         payload: message
      });
   }
};


export const updateFeatureLayerAction = (layer) => async (dispatch, getState) => {
   try {
      dispatch({
         type: FEATURE_LAYER_UPDATE_REQUEST
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
          console.log(layer + "layer Action ")
          console.log(JSON.stringify(layer) + "layer Action ")
          console.log(layer + "layer Action ")
      const { data } = await axios.put(
         `${url}/featurelayers/r/${layer.id}`,layer,  config
      );

      dispatch({
         type: FEATURE_LAYER_UPDATE_SUCCESS,
         payload: data
      });
      dispatch({ type: FEATURE_LAYER_DETAILS_SUCCESS, payload: data });
      console.log(
         data + 'my o my mmmmmmmmmmmmmmmmmmmmmmm'
      );
      console.log(
         JSON.stringify(data + 'my o my') +
            '>>>>>>>>>>>123<<<<<<<<<<<<<<<<<<<<<<<'
      );
      // dispatch({ type: FEATURE_LAYER_DETAILS_RESET });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

      dispatch({
         type: FEATURE_LAYER_UPDATE_FAIL,
         payload: message
      });
   }
};
