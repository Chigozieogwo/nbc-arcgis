
import {
    FEATURE_LAYER_DETAILS_FAIL,
    FEATURE_LAYER_DETAILS_REQUEST,
    FEATURE_LAYER_DETAILS_SUCCESS,
    FEATURE_LAYER_DETAILS_RESET,
    ADD_LAYER_TO_MAP_FAIL,
    ADD_LAYER_TO_MAP_REQUEST,
    ADD_LAYER_TO_MAP_SUCCESS,
    ADD_LAYER_TO_MAP_RESET,
 } from '../constants/featureLayerConstants.js';

 export const featureLayerDetailsReducer = (state = { layer: {} }, action) => {
   switch (action.type) {
      case FEATURE_LAYER_DETAILS_REQUEST:
         return { ...state, loading: true };
      case FEATURE_LAYER_DETAILS_SUCCESS:
         if (action.payload === undefined) {
            action.payload = {};
         }
         return { loading: false, layer: action.payload };
      case FEATURE_LAYER_DETAILS_FAIL:
         return { loading: false, error: action.payload };
      case FEATURE_LAYER_DETAILS_RESET:
         return { layer: {} };
      default:
         return state;
   }
};

  export const addLayerToMapReducer = (state = {}, action) => {
    switch (action.type) {
       case ADD_LAYER_TO_MAP_REQUEST:
          return { loading: true };
          
       case ADD_LAYER_TO_MAP_SUCCESS:
          if (action.payload === undefined) {
             action.payload = {};
          }
          return { loading: false, userInfo: action.payload };

       case ADD_LAYER_TO_MAP_FAIL:
          return { loading: false, error: action.payload };
      //  case USER_LOGOUT:
      //     return {};
       default:
          return state;
    }
};