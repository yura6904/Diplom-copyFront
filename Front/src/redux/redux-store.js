import {createStore, combineReducers, applyMiddleware} from 'redux';
import {mapReducer} from './map-reducer';
import thunk from 'redux-thunk';
//import { authReducer } from './authorization-reducer';

let reducers = combineReducers({
    mapContentData: mapReducer,
    //authorization: authReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;