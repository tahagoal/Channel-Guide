import {fetchChannels, fetchChannelsPending, fetchChannelsError} from './ActionCreators';
import { appConfig } from '../appConfig';

const api_url = appConfig.apiUrl;

export const fetchAllChannels = () => {
    return dispatch => {
        dispatch(fetchChannelsPending());
        fetch(api_url + 'getChannelWithLiveShow')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchChannels(res.products));
            return res.products;
        })
        .catch(error => {
            dispatch(fetchChannelsError(error));
        })
    }
}

// export default fetchAllChannels;