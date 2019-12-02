import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {channelsReducer} from './Reducers';

const middlewares = [thunk];

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            channelsReducer: channelsReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
}