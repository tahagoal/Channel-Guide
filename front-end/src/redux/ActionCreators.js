import * as ActionTypes from './ActionTypes';
import { appConfig } from '../appConfig';
const api_url = appConfig.apiUrl;

// export const fetchChannelsPending=()=>{
//     return {
//         type: ActionTypes.CHANNEL_LOADING
//     }
// }

// export const fetchChannels = (data) =>{
//     return{
//         type: ActionTypes.FETCH_CHANNELS,
//         payload: data
//     }
// }

// export const fetchChannelsError=(error) =>{
//     return {
//         type: ActionTypes.CHANNEL_FAILED,
//         error: error
//     }
// }

export const fetchAllChannels = () => (dispatch) => {

    dispatch(channelsLoading(true));

    return fetch(api_url + 'getChannelWithLiveShow')
    .then(response => {
        console.log(response);        
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(channels => dispatch(getChannels(channels)))
    .catch(error => dispatch(channelsFailed(error.message)));
}

export const channelsLoading = () => ({
    type: ActionTypes.CHANNEL_LOADING
});

export const channelsFailed = (err) => ({
    type: ActionTypes.CHANNEL_FAILED,
    payload: err
});

export const getChannels = (channels) => ({
    type: ActionTypes.FETCH_CHANNELS,
    payload: channels
});