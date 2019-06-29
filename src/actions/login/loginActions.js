import {USER_LOGIN,INVALID_USER,LOGOUT} from '../types';
import axios from '../../axios-demo';

export const login=(credentials)=>{
    // debugger;
   // console.log('login',credentials);
    return(dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            // debugger
            axios.post('/user/login',credentials)
                .then((res)=>{
                // debugger;
                    // console.log(res);
                    //debugger;
                    if(res.status===200){
                        localStorage.setItem('token',res.data.token);
                        localStorage.setItem('id',res.data.id);
                        dispatch({
                            type:USER_LOGIN,
                            payload:res.data
                        });
                        return resolve(res.data);
                    }

                })
                .catch((err)=>{
                 // console.log(err.response.data);
                 // debugger
                    if(err){
                        // debugger
                        dispatch({
                            type:INVALID_USER,
                            payload:err.response.data
                        })
                    }
                    return reject(err.response.data);
                 })
         })
    }
};

export const logOut = () => {
    //  debugger
    return (dispatch) => {
        dispatch({
            type: LOGOUT,
            payload:{},
        });
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    }
};