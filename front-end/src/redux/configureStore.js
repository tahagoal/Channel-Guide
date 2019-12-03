import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import {channelsReducer} from './Reducers';
import { Channels } from './channels';
import { Channel } from './singleChannel';

const middlewares = [thunk];

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            channels: Channels,
            channel: Channel
        }),
        applyMiddleware(thunk)
    );

    return store;
}