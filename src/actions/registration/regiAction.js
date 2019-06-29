import {SIGN_UP} from '../types';
import axios from '../../axios-demo';

export const signUp=(credentials)=>{
    return(dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/user/registration',credentials)
                .then((res)=>{
                    console.log(res);
                    dispatch({
                        type:SIGN_UP,
                        payload:credentials
                    })
                    return resolve(res);
                })
                .catch((err)=>{
                    console.log(err);
                })
        })
    }
}