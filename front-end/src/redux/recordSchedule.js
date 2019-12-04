import * as ActionTypes from './ActionTypes';

export const RSchedule = (state = {
    schedule: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.RECORD_SCHEDULE:
            return {...state, schedule: action.payload};
        default:
            return state;
    }
}