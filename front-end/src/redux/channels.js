import * as ActionTypes from './ActionTypes';

export const Channels = (state = {
    pending: true,
    err: null,
    channels: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_CHANNELS:
            return {...state, pending: false, err: null, channels: action.payload};
            
        case ActionTypes.CHANNEL_LOADING:
            return {...state, pending:true, err:null, channels:[]}

        case ActionTypes.CHANNEL_FAILED:
            return {...state, pending:false, err:action.payload, channels:[]}

        default:
            return state;
    }
}