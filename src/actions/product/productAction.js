import {TAB1_PRODUCT,TAB2_PRODUCT,GET_BY_ID,ADD_PRODUCT, FETCH_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT,ADD_TO_CART_PRODUCT} from '../types';
import axios from '../../axios-demo';

export const fetchProduct = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get('/product/allproduct')
                .then((res) => {
                    // console.log(res);
                    dispatch({
                        type: FETCH_PRODUCT,
                        payload: res.data,
                    })
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }
};

export const addTocartProduct=(selectedProduct)=>{
    // console.log(selectedProduct);
    return(dispatch,getstate)=>{
            dispatch({
                type:ADD_TO_CART_PRODUCT,
                payload:selectedProduct,
            })
    }
};

export const tab1 = (credentials) => {
    debugger
    console.log('cred',credentials);
    return(dispatch,getstate)=>{
        dispatch({
            type:TAB1_PRODUCT,
            payload:credentials,
        })
    }
};

export const tab2 = (credentials) => {
    debugger
    console.log('cred2',credentials);
    return(dispatch,getstate)=>{
        dispatch({
            type:TAB2_PRODUCT,
            payload:credentials,
        })
    }
};
export const addProduct = (credentials) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: '/product/',
                data: credentials,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: ADD_PRODUCT,
                        payload: credentials
                    })
                    return resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }
};

export const deleteProduct = (credentials) => {
    // const id=credential.id;
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.delete('/product/deleteproduct/:id', credentials)
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: DELETE_PRODUCT,
                        payload: res.data
                    })
                    return resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }
};

export const getById = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`/product/${id}`)
                .then((res) => {
                   // console.log(res);
                    dispatch({
                        type: GET_BY_ID,
                        payload: res.data
                    })
                    return resolve(res.data[0]);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }
};

export const updateProduct = (credentials,id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: `/product/updateproduct/${id}`,
                data: credentials,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: UPDATE_PRODUCT,
                        payload: res.data
                    })
                    return resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }
};