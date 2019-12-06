import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Channels } from './channels';
import { Channel } from './singleChannel';
import { Programs } from './programs';
import { RSchedule } from './recordSchedule';
import { ProgramDetails } from './programDetails';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            channels: Channels,
            channel: Channel,
            programs: Programs,
            rschedule: RSchedule,
            programdetails: ProgramDetails
        }),
        applyMiddleware(thunk)
    );

    return store;
}