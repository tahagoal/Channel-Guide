import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import {channelsReducer} from './Reducers';
import { Channels } from './channels';
import { Channel } from './singleChannel';
import { Programs } from './programs';

const middlewares = [thunk];

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            channels: Channels,
            channel: Channel,
            programs: Programs
        }),
        applyMiddleware(thunk)
    );

    return store;
}