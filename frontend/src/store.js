
import { productListReducer, productDetailsReducer } from './reducer/productReducers';
import {createStore,combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer
})

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(reducer, initialState,composeEnhancer(applyMiddleware(thunk)));
export default store;

