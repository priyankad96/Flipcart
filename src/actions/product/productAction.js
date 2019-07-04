import {TAB1_PRODUCT,TAB2_PRODUCT,GET_BY_ID,ADD_PRODUCT, FETCH_PRODUCT, UPDATE_PRODUCT, SEARCH_PRODUCT,ADD_TO_CART_PRODUCT} from '../types';
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
                    });
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }
};

export const searchProduct = (key) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get('/product/allproduct')
                .then((res) => {
                    // console.log(res);
                    const products=res.data;
                    let tmp=[];
                    if(key!==''){
                        products.map((item) => {
                            const fkey = key.toUpperCase();
                            const product = item.product.toUpperCase();
                            if (product.includes(fkey)) {
                                tmp.push(item);
                            }
                        });
                    }
                    if(key===''){
                        tmp=products;
                    }
                    console.log(tmp);
                    dispatch({
                        type: SEARCH_PRODUCT,
                        payload: tmp,
                    });
                    return resolve(tmp);
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
    console.log('cred',credentials);
    return(dispatch,getstate)=>{
        dispatch({
            type:TAB1_PRODUCT,
            payload:credentials,
        })
    }
};

export const tab2 = (credentials) => {
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

export const deleteProduct = (id) => {
    // const id=credential.id;
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/product/deleteproduct/${id}`)
                .then((response) => {
                    if(response){
                        axios.get('/product/allproduct').then(res=>{
                            console.log(res);
                            dispatch({
                                type: FETCH_PRODUCT,
                                payload: res.data
                            });
                            return resolve(res.data);
                        });
                    }
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