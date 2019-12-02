import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import {channelsReducer} from './Reducers';
import { Channels } from './channels';

const middlewares = [thunk];

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            channels: Channels
        }),
        applyMiddleware(thunk)
    );

    return store;
}