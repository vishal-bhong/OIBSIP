import { combineReducers } from 'redux';

import userAuthReducer from './userAuth.js';
import adminAuthReducer from './adminAuth.js';


export const reducers = combineReducers({ userAuthReducer, adminAuthReducer });