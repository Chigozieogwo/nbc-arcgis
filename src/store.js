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
} from './reducers/featureLayerReducers';




const reducer = combineReducers({
    userLogin: userLoginReducer, 
    userDetails: userDetailsReducer,

     addLayerToMap:  addLayerToMapReducer,
     featureLayerDetails: featureLayerDetailsReducer,
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
