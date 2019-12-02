// import {fetchChannels, fetchChannelsPending, fetchChannelsError} from './ActionCreators';
// import { appConfig } from '../appConfig';

// const api_url = appConfig.apiUrl;

// export const fetchAllChannels = () => {
//     return dispatch => {
//         dispatch(fetchChannelsPending());
//         fetch(api_url + 'getChannelWithLiveShow')
//         .then(res => res.json())
//         .then(res => {
//             if(res.error) {
//                 throw(res.error);
//             }
//             dispatch(fetchChannels(res));
//             return res;
//         })
//         .catch(error => {
//             dispatch(fetchChannelsError(error));
//         })
//     }
// }

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

// export default fetchAllChannels;