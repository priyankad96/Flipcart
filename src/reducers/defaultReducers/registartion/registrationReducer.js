import {SIGN_UP} from '../../../actions/types';

const INITIAL_STATE={
    userInfo:[]
}

const reducer=(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case SIGN_UP:{
           return state;
        }
        default:
            return state;
    }
}

export default reducer;