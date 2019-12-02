import * as ActionTypes from './ActionTypes';

const initialState = {
    pending: false,
    channels: [],
    error: null
}

export function channelsReducer(state = initialState, action){
    switch (action.type) {
        case ActionTypes.FETCH_CHANNELS:
            return { ...state, pending: false, error: null, dishes: action.payload };

        case ActionTypes.CHANNEL_LOADING:
            return { ...state, pending: true, error: null, dishes: [] }

        case ActionTypes.CHANNEL_FAILED:
            return { ...state, pending: false, error: action.payload, dishes: [] }

        default:
            return state;
    }
}

export const getChannels = state => state.channels;
export const getChannelsPending = state => state.pending;
export const getChannelsError = state => state.error;