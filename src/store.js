import {  combineReducers, applyMiddleware ,createStore} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
   userLoginReducer,
   userDetailsReducer, 
} from './reducers/userReducers';
import {
   addLayerToMapReducer,
   featureLayerDetailsReducer, 
   ListFeatureLayerReducer,
   featureLayerUpdateReducer,
   featureLayerCreateReducer
} from './reducers/featureLayerReducers';

import {
   
   documentCreateReducer,
   documentListReducer,
   documentDeleteReducer,
   documentUpdateReducer,
   documentDetailsReducer
} from './reducers/documentReducers';


const reducer = combineReducers({
    userLogin: userLoginReducer, 
    userDetails: userDetailsReducer,
    
    ListFeatureLayer :ListFeatureLayerReducer ,
     addLayerToMap:  addLayerToMapReducer,
     featureLayerDetails: featureLayerDetailsReducer,
     featureLayerCreate: featureLayerCreateReducer,
     featureLayerUpdate: featureLayerUpdateReducer,

     documentCreate : documentCreateReducer,
     documentList : documentListReducer,
     documentDelete : documentDeleteReducer,
     documentUpdate : documentUpdateReducer,
     documentDetails : documentDetailsReducer
     });

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null;


const initialState = {
   userLogin: { userInfo: userInfoFromStorage },
   
};

const middleware = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
