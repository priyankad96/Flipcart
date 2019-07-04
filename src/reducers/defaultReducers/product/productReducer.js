import {TAB1_PRODUCT,TAB2_PRODUCT,GET_BY_ID,ADD_PRODUCT,SEARCH_PRODUCT,UPDATE_PRODUCT,FETCH_PRODUCT,ADD_TO_CART_PRODUCT} from '../../../actions/types';

const INITIAL_STATE={
    product:[],
    selectedProduct:[],
    tab1:[],
    tab2:[],
};

const reducer=(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case FETCH_PRODUCT:{
            return {
                ...state,
                product:action.payload
            }
        }
        case TAB1_PRODUCT:{
            return {
                ...state,
                tab1:action.payload
            }
        }
        case TAB2_PRODUCT:{
            return {
                ...state,
                tab2:action.payload
            }
        }
        case GET_BY_ID:{
            return {
                ...state,
                product:action.payload
            }
        }
        case ADD_PRODUCT:{
            return {
                ...state,
                product:action.payload
            }
        }
        case UPDATE_PRODUCT:{
            return {
                ...state,
                product:action.payload
            }
        }
        case ADD_TO_CART_PRODUCT:{
            return {
                ...state,
                selectedProduct:action.payload
            }
        }
        case SEARCH_PRODUCT:{
            return {
                ...state,
                product:action.payload
            }
        }
        default:
            return state;
    }
}

export default reducer;