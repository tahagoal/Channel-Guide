import * as ActionTypes from './ActionTypes';

export const Programs = (state = {
    pending: true,
    err: null,
    programs: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.GET_PROGRAMS:
            return {...state, pending: false, err: null, programs: action.payload};
            
        case ActionTypes.PROGRAMS_LOADING:
            return {...state, pending:true, err:null, programs:[]}

        case ActionTypes.PROGRAMS_FAILED:
            return {...state, pending:false, err:action.payload, programs:[]}

        default:
            return state;
    }
}