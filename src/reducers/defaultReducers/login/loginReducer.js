import {USER_LOGIN, INVALID_USER, LOGOUT} from '../../../actions/types';

const INITIAL_STATE={
    userInfo:[]
}

const reducer=(state=INITIAL_STATE,action)=>{
    // debugger
    switch (action.type){
        case USER_LOGIN:{
            return {
                ...state,
                userInfo:action.payload
            }
        }
        case INVALID_USER:{
            return {
                ...state,
                userInfo:action.payload
            }
        }
        case LOGOUT:{
            return {
                ...state,
                userInfo:action.payload
            }
        }
        default:
            return state;
    }
}

export default reducer;