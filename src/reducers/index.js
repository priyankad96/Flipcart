import {combineReducers} from "redux";
import signUpReducer from './defaultReducers/registartion/registrationReducer';
import loginReducer from './defaultReducers/login/loginReducer';
import productReducer from './defaultReducers/product/productReducer';

export const rootReducer=combineReducers({
    signUp:signUpReducer,
    login:loginReducer,
    product:productReducer,
});