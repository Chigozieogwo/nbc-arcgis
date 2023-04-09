import {
    
    DOCUMENT_CREATE_REQUEST,
    DOCUMENT_CREATE_SUCCESS,
    DOCUMENT_CREATE_FAIL,
    DOCUMENT_LIST_REQUEST,
    DOCUMENT_LIST_SUCCESS,
    DOCUMENT_LIST_FAIL,
    DOCUMENT_UPDATE_RESET,
    DOCUMENT_UPDATE_FAIL,
    DOCUMENT_UPDATE_SUCCESS,
    DOCUMENT_UPDATE_REQUEST,
    DOCUMENT_DETAILS_RESET,
    DOCUMENT_DETAILS_FAIL,
    DOCUMENT_DETAILS_SUCCESS,
    DOCUMENT_DETAILS_REQUEST,
    DOCUMENT_DELETE_FAIL,
    DOCUMENT_DELETE_SUCCESS,
    DOCUMENT_DELETE_REQUEST
 } from '../constants/documentConstants.js';
 
 
 
 
 export const documentCreateReducer = (state = {}, action) => {
    //   const { type, payload } = action
    switch (action.type) {
       case DOCUMENT_CREATE_REQUEST:
          return { loading: true };
       case DOCUMENT_CREATE_SUCCESS:
          return { loading: false, document: action.payload, success: true };
       case DOCUMENT_CREATE_FAIL:
          return { loading: false, error: action.payload };
       default:
          return state;
    }
 };
 
 export const documentListReducer = (state = { documents: [] }, action) => {
    //   const { type, payload } = action
    switch (action.type) {
       case DOCUMENT_LIST_REQUEST:
          return { loading: true };
       case DOCUMENT_LIST_SUCCESS:
          return {
             loading: false,
             documents: action.payload,
             
          };
       case DOCUMENT_LIST_FAIL:
          return { loading: false, error: action.payload };
       default:
          return state;
    }
 };
 
 export const documentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
       case DOCUMENT_DELETE_REQUEST:
          return { loading: true };
       case DOCUMENT_DELETE_SUCCESS:
          return { loading: false, success: true };
       case DOCUMENT_DELETE_FAIL:
          return { loading: false, error: action.payload };
       default:
          return state;
    }
 };
 
 export const documentDetailsReducer = (state = {}, action) => {
    //   const { type, payload } = action
    switch (action.type) {
       case DOCUMENT_DETAILS_REQUEST:
          return { ...state, loading: true };
       case DOCUMENT_DETAILS_SUCCESS:
          if (action.payload === undefined) {
             action.payload = {};
          }
          return { loading: false, document: action.payload };
 
       case DOCUMENT_DETAILS_FAIL:
          return { loading: false, error: action.payload };
       case DOCUMENT_DETAILS_RESET:
          return { document: {} };
       default:
          return state;
    }
 };
 
 
 export const documentUpdateReducer = (state = { document: {} }, action) => {
    switch (action.type) {
       case DOCUMENT_UPDATE_REQUEST:
          return { loading: true };
       case DOCUMENT_UPDATE_SUCCESS:
          return { loading: false, success: true, document: action.payload };
       case DOCUMENT_UPDATE_FAIL:
          return { loading: false, error: action.payload };
       case DOCUMENT_UPDATE_RESET:
          return { document: {} };
       default:
          return state;
    }
 };
 