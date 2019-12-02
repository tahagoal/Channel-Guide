import * as ActionTypes from './ActionTypes';


export const fetchChannelsPending=()=>{
    return {
        type: ActionTypes.CHANNEL_LOADING
    }
}

export const fetchChannels = (data) =>{
    return{
        type: ActionTypes.FETCH_CHANNELS,
        payload: data
    }
}

export const fetchChannelsError=(error) =>{
    return {
        type: ActionTypes.CHANNEL_FAILED,
        error: error
    }
}
