import * as ActionTypes from './ActionTypes';
import { appConfig } from '../appConfig';
const api_url = appConfig.apiUrl;

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




export const fetchSingleChannel = (id) => (dispatch) => {

  dispatch(singleLoading(true));

  return fetch(api_url + `channel/details/${id}`)
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
  .then(channel => dispatch(singleChannel(channel)))
  .catch(error => dispatch(singleFailed(error.message)));
}

export const singleLoading = () => ({
  type: ActionTypes.SINGLE_LOADING
});

export const singleFailed = (err) => ({
  type: ActionTypes.SINGLE_FAILED,
  payload: err
});

export const singleChannel = (channel) => ({
  type: ActionTypes.SINGLE_CHANNEL,
  payload: channel
});


export const fetchPrograms = (text) => (dispatch) => {

  dispatch(programsLoading(true));

  return fetch(api_url + `programs/search/${text}`)
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
  .then(channel => dispatch(getPrograms(channel)))
  .catch(error => dispatch(programsFailed(error.message)));
}

export const programsLoading = () => ({
  type: ActionTypes.PROGRAMS_LOADING
});

export const programsFailed = (err) => ({
  type: ActionTypes.PROGRAMS_FAILED,
  payload: err
});

export const getPrograms = (channel) => ({
  type: ActionTypes.GET_PROGRAMS,
  payload: channel
});


export const recordSchedule = (schedule_id) => (dispatch) => {

  dispatch(RecordLoading(true));

  return fetch(api_url + `record/schedule/${schedule_id}`,{
    method: "POST"
  })
  .then(response => {
      // console.log(response);
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
    .then(response => {alert("Show will be recorded")})
    .then(channel => dispatch(postsRecord(channel)))
    .catch(error => dispatch(RecordFailed(error.message)));
}

export const RecordLoading = () => ({
  type: ActionTypes.RECORD_LOADING
});

export const RecordFailed = (err) => ({
  type: ActionTypes.RECORD_FAILED,
  payload: err
});

export const postsRecord = (channel) => ({
  type: ActionTypes.GET_PROGRAMS,
  payload: channel
});