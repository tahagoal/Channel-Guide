import * as ActionTypes from './ActionTypes';

export const Channel = (state = {
    pending: true,
    err: null,
    channel: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.SINGLE_CHANNEL:
            return {...state, pending: false, err: null, channel: action.payload};
            
        case ActionTypes.SINGLE_LOADING:
            return {...state, pending:true, err:null, channel:{}}

        case ActionTypes.SINGLE_FAILED:
            return {...state, pending:false, err:action.payload, channel:{}}

        default:
            return state;
    }
}